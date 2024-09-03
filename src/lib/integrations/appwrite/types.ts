import { Models } from "appwrite";

export type User = Models.User<UserPrefs>;

export type UserPrefs = Models.Preferences & {
  geminiApiKey?: string;
};

export type UserInfo = {
  name: string;
  description?: string;
  points: number;
  posts?: Omit<PostDocument, "user">[];
};

export type UserInfoDocument = Models.Document & UserInfo;

export type Post = {
  content: string;
  mediaUrl?: string;
  user?: Omit<UserInfoDocument, "posts">;
};

export type PostDocument = Models.Document & Post;