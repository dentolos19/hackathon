import { collectionIds, databaseIds, databases } from "@/lib/integrations/appwrite/main";
import { Expense, ExpenseDocument } from "@/lib/integrations/appwrite/types";
import { ID, Query } from "appwrite";

export function createExpense(userId: string, data: Omit<Expense, "user">) {
  return databases.createDocument(databaseIds.main, collectionIds.expenses, ID.unique(), {
    ...data,
    user: userId,
  });
}

export function getExpense(expenseId: string) {
  return databases.getDocument(databaseIds.main, collectionIds.expenses, expenseId).then((res) => {
    return res as ExpenseDocument;
  });
}

export function getExpenses(userId: string) {
  return databases
    .listDocuments(databaseIds.main, collectionIds.expenses, [
      Query.equal("user", userId),
      Query.orderDesc("$createdAt"),
    ])
    .then((res) => {
      return res.documents as ExpenseDocument[];
    });
}

export function updateExpense(expenseId: string, data: Partial<Omit<Expense, "user">>) {
  return databases.updateDocument(databaseIds.main, collectionIds.expenses, expenseId, data);
}

export function deleteExpense(expenseId: string) {
  return databases.deleteDocument(databaseIds.main, collectionIds.expenses, expenseId);
}