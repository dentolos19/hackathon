import { account, collectionIds, databaseIds, databases } from "@/lib/integrations/appwrite/main";
import { Post } from "@/lib/integrations/appwrite/types";

export function sendEmailVertification() {
  return account.createVerification(window.location.origin + "/verify");
}

export function getPosts() {
  return databases.listDocuments(databaseIds.main, collectionIds.posts).then((res) => {
    return res.documents as Post[];
  });
}