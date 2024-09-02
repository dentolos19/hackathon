import { Models } from "appwrite";

export type UserPrefs = Models.Preferences & {
  geminiApiKey?: string;
};

export type Post = Models.Document & {
  author: string;
  content: string;
  mediaUrl?: string;
};