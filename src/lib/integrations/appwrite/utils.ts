import { account, collectionIds, databaseIds, databases } from "@/lib/integrations/appwrite/main";
import { Post, User, UserInfo, UserPrefs } from "@/lib/integrations/appwrite/types";
import { ID, Query } from "appwrite";

export async function loginUser(email: string, password: string) {
  const session = await account.createEmailPasswordSession(email, password);
  const user = (await account.get<UserPrefs>()) as User;
  return { session, user };
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
    return { session, user };
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export async function getUserInfo(user: User) {
  return await databases
    .getDocument(databaseIds.main, collectionIds.users, user.$id)
    .then((res) => {
      return res.document as UserInfo;
    })
    .catch((err) => {
      console.error(err);
      return databases
        .createDocument(databaseIds.main, collectionIds.users, user.$id, {
          name: user.name,
          points: 0,
        })
        .then((res) => {
          return res.document as UserInfo;
        })
        .catch((err) => {
          console.error(err);
          return undefined;
        });
    });
}

export function sendEmailVertification() {
  return account.createVerification(window.location.origin + "/verify");
}

export function getPosts() {
  return databases.listDocuments(databaseIds.main, collectionIds.posts, [Query.orderDesc("$createdAt")]).then((res) => {
    return res.documents as Post[];
  });
}

export function createPost(user: User, content: string, mediaUrl?: string) {
  return databases.createDocument(databaseIds.main, collectionIds.posts, ID.unique(), {
    content,
    // mediaUrl,
    user: user.$id,
  });
}