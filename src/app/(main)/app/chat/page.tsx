"use client";

import { useAuth } from "@/components/providers/auth-provider";
import DevelopmentView from "@/components/views/development-view";
import MessageView from "@/components/views/message-view";

export default function Page() {
  const auth = useAuth();

  if (!auth.user) return <></>;
  if (!auth.user.prefs.geminiApiKey)
    return (
      <MessageView
        title={"Missing Parameters"}
        message={"Please set up your Gemini API Key in the settings before proceeding!"}
      />
    );

  return <DevelopmentView />;
}