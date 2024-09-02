import { Account, Client } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66d2ee3e003d049162cc");

export const account = new Account(client);

export function sendEmailVertification() {
  return account.createVerification(window.location.origin + "/verify");
}