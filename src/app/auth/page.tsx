"use client";

import { account } from "@/lib/integrations/appwrite";
import { Box, Button, Input, Paper, Text } from "@mantine/core";
import { ID } from "appwrite";
import { useEffect, useState } from "react";

export default function Page() {
  const [phase, setPhase] = useState<"login" | "otp" | "complete">("login");
  const [userId, setUserId] = useState<string>();
  const [sessionId, setSessionId] = useState<string>();

  const handleLogin = async (data: FormData) => {
    const email = data.get("email") as string;
    const token = await account.createEmailToken(ID.unique(), email, false);
    setUserId(token.userId);
    setPhase("otp");
  };

  const handleOtp = async (data: FormData) => {
    const otp = data.get("otp") as string;
    if (!userId) return;
    const session = await account.createSession(userId, otp);
    setSessionId(session.$id);
    setPhase("complete");
  };

  const handleLogout = async () => {
    await account.deleteSession("current");
    setUserId(undefined);
    setSessionId(undefined);
    setPhase("login");
  };

  useEffect(() => {
    account.get().then((res) => {
      setUserId(res.$id);
      setPhase("complete");
    });
  }, []);

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"mx-auto p-8 w-[300px]"} withBorder>
        <Box className={"mb-4"}>
          <Text className={"font-bold text-2xl text-center"}>Login</Text>
        </Box>
        {phase === "login" && (
          <Box component={"form"} action={handleLogin}>
            <Input type={"email"} name={"email"} placeholder={"Email"} />
            <Button className={"mt-4 w-full"} type={"submit"}>
              Login
            </Button>
          </Box>
        )}
        {phase === "otp" && (
          <Box component={"form"} action={handleOtp}>
            <Input type={"number"} name={"otp"} placeholder={"OTP"} />
            <Button className={"mt-4 w-full"} type={"submit"}>
              Submit
            </Button>
          </Box>
        )}
        {phase === "complete" && (
          <Box>
            <p>User ID: {userId}</p>
            <p>Session ID: {sessionId}</p>
            <Button className={"mt-4 w-full"} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}