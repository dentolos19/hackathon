import { useAuth } from "@/components/auth-provider";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function LoginView() {
  const auth = useAuth();
  const [phase, setPhase] = useState<"login" | "register">("login");

  const handleLogin = async (data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    await auth.login(email, password);
  };

  const handleRegister = async (data: FormData) => {
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const confirmPassword = data.get("confirmPassword") as string;
    if (password !== confirmPassword) return;
    await auth.register(email, password, name);
  };

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 w-80"} variant={"outlined"}>
        {phase === "login" && (
          <Box component={"form"} className={"flex flex-col gap-4"} action={handleLogin}>
            <Typography className={"font-bold text-2xl text-center"}>Login</Typography>
            <Box className={"flex flex-col gap-2"}>
              <TextField
                variant={"filled"}
                size={"small"}
                type={"email"}
                name={"email"}
                placeholder={"Email"}
                hiddenLabel
                required
              />
              <TextField
                variant={"filled"}
                size={"small"}
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                hiddenLabel
                required
              />
            </Box>
            <Box className={"flex gap-2 [&>*]:flex-1"}>
              <Button variant={"contained"} type={"submit"}>
                Login
              </Button>
              <Button variant={"outlined"} color={"secondary"} type={"button"} onClick={() => setPhase("register")}>
                Register
              </Button>
            </Box>
          </Box>
        )}
        {phase === "register" && (
          <Box component={"form"} className={"flex flex-col gap-4"} action={handleRegister}>
            <Typography className={"font-bold text-2xl text-center"}>Register</Typography>
            <Box className={"flex flex-col gap-2"}>
              <TextField
                variant={"filled"}
                size={"small"}
                type={"text"}
                name={"name"}
                placeholder={"Name"}
                hiddenLabel
                required
              />
              <TextField
                variant={"filled"}
                size={"small"}
                type={"email"}
                name={"email"}
                placeholder={"Email"}
                hiddenLabel
                required
              />
              <TextField
                variant={"filled"}
                size={"small"}
                type={"password"}
                name={"password"}
                placeholder={"Password"}
                hiddenLabel
                required
              />
              <TextField
                variant={"filled"}
                size={"small"}
                type={"password"}
                name={"confirmPassword"}
                placeholder={"Confirm Password"}
                hiddenLabel
                required
              />
            </Box>
            <Box className={"flex gap-2 [&>*]:flex-1"}>
              <Button variant={"contained"} type={"submit"}>
                Register
              </Button>
              <Button variant={"outlined"} color={"secondary"} type={"button"} onClick={() => setPhase("login")}>
                Login
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}