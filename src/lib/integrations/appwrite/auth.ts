import { account, collectionIds, databaseIds, databases } from "@/lib/integrations/appwrite/main";
import { User, UserInfo, UserInfoSchema, UserPrefs } from "@/lib/integrations/appwrite/types";
import { ID, Query } from "appwrite";

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
    return { session, user, userInfo };
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function updateUserPrefs(data: Partial<UserPrefs>) {
  return account.updatePrefs(data);
}

export async function getUserInfo(user: User) {
  let data = await databases
    .getDocument(databaseIds.main, collectionIds.users, user.$id, [
      // NOTE: update this when adding new attributes
      Query.select(["name", "description", "points"]),
    ])
    .catch((err) => {
      console.error(err);
      return undefined;
    });
  if (!data) {
    data = await databases.createDocument(databaseIds.main, collectionIds.users, user.$id, {
      name: user.name,
    });
  }
  return UserInfoSchema.parse(data) as UserInfo;
}

export async function updateUserInfo(user: User, data: Partial<UserInfo>) {
  if (data.name) await account.updateName(data.name);
  const res = await databases.updateDocument(databaseIds.main, collectionIds.users, user.$id, data);
  return UserInfoSchema.parse(res) as UserInfo;
}

export function sendEmailVertification() {
  return account.createVerification(window.location.origin + "/verify");
}