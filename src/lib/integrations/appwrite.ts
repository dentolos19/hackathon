import { Account, Client, Models } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66d2ee3e003d049162cc");

export const account = new Account(client);

export type UserPrefs = Models.Preferences & {
  geminiApiKey?: string;
};

export function sendEmailVertification() {
  return account.createVerification(window.location.origin + "/verify");
}