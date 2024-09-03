import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { convertToCoreMessages, streamText } from "ai";
import { NextRequest } from "next/server";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  const { messages } = await req.json();

  if (!apiKey) return new Response("Unauthorized", { status: 401 });

  const provider = createGoogleGenerativeAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta",
    apiKey,
  });

  const result = await streamText({
    model: provider("gemini-1.5-flash-latest"),
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}