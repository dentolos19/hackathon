import { createGoogleGenerativeAI, GoogleGenerativeAIProvider } from "@ai-sdk/google";

export function createProvider(apiKey: string) {
  return createGoogleGenerativeAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta",
    apiKey,
  });
}

export function createModel(provider: GoogleGenerativeAIProvider) {
  return provider("gemini-1.5-flash-latest");
}