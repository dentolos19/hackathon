import { account, collectionIds, databaseIds, databases } from "@/lib/integrations/appwrite/main";
import { User, UserInfo, UserInfoDocument, UserPrefs } from "@/lib/integrations/appwrite/types";
import { ID } from "appwrite";

export async function loginUser(email: string, password: string) {
  const session = await account.createEmailPasswordSession(email, password);
  const user = (await account.get<UserPrefs>()) as User;
  const userInfo = await getUserInfo(user);
  return { session, user, userInfo };
}

export async function logoutUser() {
  await account.deleteSession("current");
}

export async function registerUser(email: string, password: string, name?: string) {
  return await account.create<UserPrefs>(ID.unique(), email, password, name).then(() => loginUser(email, password));
}

export async function getUser() {
  try {
    const session = await account.getSession("current");
    const user = (await account.get<UserPrefs>()) as User;
    const userInfo = await getUserInfo(user);
    console.log(session, user, userInfo);
    return { session, user, userInfo };
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function getUserInfo(user: User) {
  let userInfo = await databases.getDocument<UserInfoDocument>(databaseIds.main, collectionIds.users, user.$id).catch((err) => {
    console.error(err);
    return undefined;
  });
  if (!userInfo) {
    userInfo = await databases.createDocument<UserInfoDocument>(databaseIds.main, collectionIds.users, user.$id, {
      name: user.name,
    });
  }
  return userInfo;
}

export async function updateUserPrefs(data: Partial<UserPrefs>) {
  return account.updatePrefs(data);
}

export async function updateUserInfo(user: User, data: Partial<UserInfo>) {
  if (data.name) await account.updateName(data.name);
  return await databases.updateDocument(databaseIds.main, collectionIds.users, user.$id, data);
}

export function sendEmailVertification() {
  return account.createVerification(window.location.origin + "/verify");
}