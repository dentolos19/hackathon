import { collectionIds, databaseIds, databases } from "@/lib/integrations/appwrite/main";
import { Expense, ExpenseDocument, ExpenseDocumentSchema } from "@/lib/integrations/appwrite/types";
import { ID, Query } from "appwrite";

export async function createExpense(userId: string, data: Omit<Expense, "user">) {
  const doc = await databases.createDocument(databaseIds.main, collectionIds.expenses, ID.unique(), {
    ...data,
    user: userId,
  });
  return ExpenseDocumentSchema.parse(doc) as ExpenseDocument;
}

export async function getExpense(expenseId: string) {
  const doc = await databases.getDocument(databaseIds.main, collectionIds.expenses, expenseId);
  return ExpenseDocumentSchema.parse(doc) as ExpenseDocument;
}

export async function getExpenses(userId: string) {
  const res = await databases.listDocuments(databaseIds.main, collectionIds.expenses, [
    Query.equal("user", userId),
    Query.orderDesc("date"),
  ]);
  return res.documents.map((doc) => ExpenseDocumentSchema.parse(doc) as ExpenseDocument);
}

export async function getMonthlyExpenses(userId: string, year: number, month: number) {
  const res = await databases.listDocuments(databaseIds.main, collectionIds.expenses, [
    Query.equal("user", userId),
    Query.greaterThan("date", new Date(year, month, 1).toISOString()),
    Query.lessThan("date", new Date(year, month + 1, 0).toISOString()),
    Query.orderDesc("date"),
    Query.select(["cost", "quantity"]),
  ]);
  let result = 0;
  res.documents.forEach((doc) => {
    result += doc.cost * doc.quantity;
  });
  return result;
}

export async function updateExpense(expenseId: string, data: Partial<Omit<Expense, "user">>) {
  const res = await databases.updateDocument(databaseIds.main, collectionIds.expenses, expenseId, data);
  return ExpenseDocumentSchema.parse(res) as ExpenseDocument;
}

export async function deleteExpense(expenseId: string) {
  await databases.deleteDocument(databaseIds.main, collectionIds.expenses, expenseId);
}