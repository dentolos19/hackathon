import { Models } from "appwrite";

export type User = Models.Document & {
  name: string;
  points: number;
};

export type UserPrefs = Models.Preferences & {
  geminiApiKey?: string;
};

export type Post = Models.Document & {
  author: string;
  content: string;
  mediaUrl?: string;
};