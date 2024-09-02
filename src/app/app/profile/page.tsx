"use client";

import { useAuth } from "@/components/auth-provider";
import { sendEmailVertification } from "@/lib/integrations/appwrite";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const auth = useAuth();

  if (auth.loading || !auth.user) return <></>;

  const handleVerification = async () => {
    await sendEmailVertification();
  }

  const handleSettings = () => {
    router.push("/app/profile/settings")
  }

  const handleLogout = () => {
    auth.logout().then(() => router.push("/"));
  };

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 w-[300px]"} variant={"elevation"}>
        <Box className={"flex flex-col gap-4"}>
          <Avatar className={"mx-auto size-[80px] text-4xl"} sx={{ backgroundColor: blue[800] }}>
            {(auth.user.name ? auth.user.name[0] : auth.user.email[0]).toUpperCase()}
          </Avatar>
          <Typography className={"font-bold text-2xl text-center"}>{auth.user.name || auth.user.email}</Typography>
          <Box className={"flex flex-col gap-2"}>
            {auth.user.emailVerification || (
              <Button variant={"contained"} color={"success"} onClick={handleVerification}>Verify Email</Button>
            )}
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