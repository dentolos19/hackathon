"use client";

import { useAuth } from "@/components/providers/auth-provider";
import MessageView from "@/components/views/message-view";
import { createModel, createProvider } from "@/lib/integrations/ai/main";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, Paper, Stack, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { generateText } from "ai";
import clsx from "clsx";
import { useState } from "react";

export default function Page() {
  const auth = useAuth();
  const [messages, setMessages] = useState<
    {
      actor: "user" | "bot";
      message: string;
    }[]
  >([]);

  if (!auth.user || !auth.user.prefs.geminiApiKey)
    return (
      <MessageView
        title={"Missing Parameters"}
        message={"Please set up your Gemini API Key in the settings before proceeding!"}
      />
    );

  const provider = createProvider(auth.user.prefs.geminiApiKey);
  const model = createModel(provider);

  const handleSend = (data: FormData) => {
    const prompt = data.get("message") as string;
    setMessages((prev) => [...prev, { actor: "user", message: prompt }]);
    generateText({
      model,
      prompt,
      // TODO: add message memory
    }).then((res) => {
      setMessages((prev) => [...prev, { actor: "bot", message: res.text }]);
    });
  };

  return (
    <Box className={"mx-auto w-[90%] md:w-[70%] h-full flex flex-col"}>
      <Stack className={"py-4 flex-1"} spacing={1}>
        {messages.map((message, index) => (
          <Paper key={index} className={clsx("p-4 w-fit min-w-32", message.actor === "user" && "self-end text-end")}>
            <Typography className={"font-bold text-lg"}>{message.actor}</Typography>
            <Typography>{message.message}</Typography>
          </Paper>
        ))}
      </Stack>
      <Toolbar component={"form"} className={"flex"} action={handleSend}>
        <TextField
          className={"flex-1"}
          variant={"filled"}
          size={"small"}
          type={"text"}
          name={"message"}
          placeholder={"Message"}
          hiddenLabel
        />
        <Tooltip title={"Send"}>
          <IconButton className={"ml-2"} type={"submit"}>
            <SendIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </Box>
  );
}