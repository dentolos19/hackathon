import { Models } from "appwrite";
import { z } from "zod";

export type User = Models.User<UserPrefs>;

export type UserPrefs = Models.Preferences & {
  geminiApiKey?: string;
};

// NOTE: when adding new attributes, update "getUserInfo" in "auth.ts"
export const UserInfoSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  points: z.number(),
  // posts: z.array(PostSchema).optional(),
  // budgets: z.array(BudgetSchema).optional(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;
export type UserInfoDocument = Models.Document & UserInfo;

export const PostSchema = z.object({
  content: z.string(),
  // mediaUrl: z.string().optional(),
});

export type Post = z.infer<typeof PostSchema>;
export type PostDocument = Models.Document & Post;

export const ExpenseSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  date: z.date(),
  cost: z.number(),
  quantity: z.number(),
  tags: z.array(z.string()).optional(),
  user: UserInfoSchema
});

export type Expense = z.infer<typeof ExpenseSchema>;
export type ExpenseDocument = Models.Document & Expense;