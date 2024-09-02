import { Account, Client } from "appwrite";

export const appwrite = new Client();
appwrite.setEndpoint("https://cloud.appwrite.io/v1").setProject("66d2ee3e003d049162cc");
// appwrite.headers["X-Appwrite-Key"] = APPWRITE_KEY;

export const account = new Account(appwrite);