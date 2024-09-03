import { Models } from "appwrite";

export type User = Models.User<UserPrefs>;

export type UserInfo = Models.Document & {
  name: string;
  points: number;
  posts?: Omit<Post, "user">[];
};

export type UserPrefs = Models.Preferences & {
  geminiApiKey?: string;
};

export type Post = Models.Document & {
  author: string;
  content: string;
  mediaUrl?: string;
  user?: Omit<Post, "posts">[];
};