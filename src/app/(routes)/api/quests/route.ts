import quests from "@/content/data/quests.json";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json(quests, { status: 200 });

  const quest = quests.find((quest) => quest.id === id);
  if (!quest) return new NextResponse("Not found.", { status: 404 });

  return NextResponse.json(quest, { status: 200 });
}