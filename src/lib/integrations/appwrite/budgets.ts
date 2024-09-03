import { collectionIds, databaseIds, databases } from "@/lib/integrations/appwrite/main";
import { Budget, BudgetDocument } from "@/lib/integrations/appwrite/types";
import { ID, Query } from "appwrite";

export function createBudget(userId: string, data: Omit<Budget, "user">) {
  return databases.createDocument(databaseIds.main, collectionIds.budgets, ID.unique(), {
    ...data,
    user: userId,
  });
}

export function getBudget(budgetId: string) {
  return databases.getDocument(databaseIds.main, collectionIds.budgets, budgetId).then((res) => {
    return res as BudgetDocument;
  });
}

export function getBudgets(userId: string) {
  return databases
    .listDocuments(databaseIds.main, collectionIds.budgets, [
      Query.equal("user", userId),
      Query.orderDesc("$createdAt"),
    ])
    .then((res) => {
      return res.documents as BudgetDocument[];
    });
}

export function updateBudget(budgetId: string, data: Partial<Omit<Budget, "user">>) {
  return databases.updateDocument(databaseIds.main, collectionIds.budgets, budgetId, data);
}

export function deleteBudget(budgetId: string) {
  return databases.deleteDocument(databaseIds.main, collectionIds.budgets, budgetId);
}