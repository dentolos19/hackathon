"use client";

import { account } from "@/lib/integrations/appwrite";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { ID } from "appwrite";
import Link from "next/link";
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
    <Box component={"main"} className={"h-dvh grid place-items-center"}>
      <Paper className={"p-8 w-80"} variant={"outlined"}>
        {phase === "login" && (
          <Box component={"form"} className={"flex flex-col gap-4"} action={handleLogin}>
            <Typography className={"text-2xl text-center"}>Hello!</Typography>
            <TextField
              variant={"filled"}
              size={"small"}
              type={"email"}
              name={"email"}
              placeholder={"Email"}
              hiddenLabel
            />
            <Button variant={"contained"} type={"submit"}>
              Login
            </Button>
          </Box>
        )}
        {phase === "otp" && (
          <Box component={"form"} className={"flex flex-col gap-4"} action={handleOtp}>
            <Typography className={"text-2xl text-center"}>Enter OTP</Typography>
            <TextField
              variant={"filled"}
              size={"small"}
              type={"number"}
              name={"otp"}
              placeholder={"One-Time Password"}
              hiddenLabel
            />
            <Button variant={"contained"} type={"submit"}>
              Continue
            </Button>
          </Box>
        )}
        {phase === "complete" && (
          <Box className={"flex flex-col gap-4"}>
            <Typography className={"text-2xl text-center"}>Welcome!</Typography>
            <Typography className={"text-center"}>Hello, {userId}!</Typography>
            <Box className={"flex flex-col gap-2"}>
              <Button LinkComponent={Link} variant={"contained"} color={"info"} href={"/app"}>
                Continue
              </Button>
              <Button variant={"contained"} color={"error"} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}