"use client";

import { useAuth } from "@/components/auth-provider";
import { Person } from "@mui/icons-material";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const auth = useAuth();

  if (auth.loading || !auth.user) return <></>;

  const handleSettings = () => {
    router.push("/app/profile/settings")
  }

  const handleLogout = () => {
    auth.logout().then(() => router.push("/"));
  };

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8"} variant={"elevation"}>
        <Box className={"flex flex-col gap-4"}>
          <Avatar className={"mx-auto size-[100px]"}>
            <Person />
          </Avatar>
          <Typography className={"font-bold text-2xl"}>{auth.user.name || auth.user.email}</Typography>
          <Box className={"flex flex-col gap-2"}>
            <Button variant={"contained"} color={"info"} onClick={handleSettings}>
              Settings
            </Button>
            <Button variant={"contained"} color={"error"} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}