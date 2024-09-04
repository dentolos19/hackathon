import { collectionIds, databaseIds, databases } from "@/lib/integrations/appwrite/main";
import { Post, PostDocument } from "@/lib/integrations/appwrite/types";
import { ID, Query } from "appwrite";

export function createPost(userId: string, data: Omit<Post, "user">) {
  return databases.createDocument(databaseIds.main, collectionIds.posts, ID.unique(), {
    ...data,
    user: userId,
  });
}

export function getPost(postId: string) {
  return databases.getDocument(databaseIds.main, collectionIds.posts, postId).then((res) => {
    return res as PostDocument;
  });
}

export function getPosts() {
  return databases.listDocuments(databaseIds.main, collectionIds.posts, [Query.orderDesc("$createdAt")]).then((res) => {
    return res.documents as PostDocument[];
  });
}

export function updatePost(postId: string, data: Partial<Omit<Post, "user">>) {
  return databases.updateDocument(databaseIds.main, collectionIds.posts, postId, data);
}

export function deletePost(postId: string) {
  return databases.deleteDocument(databaseIds.main, collectionIds.posts, postId);
}