import { Models } from "appwrite";

export type User = Models.User<UserPrefs>;

export type UserInfo = Models.Document & {
  name: string;
  description?: string;
  points: number;
  posts?: Omit<Post, "user">[];
};

export type UserPrefs = Models.Preferences & {
  geminiApiKey?: string;
};

export type Post = Models.Document & {
  content: string;
  mediaUrl?: string;
  user?: Omit<UserInfo, "posts">;
};