"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { account, sendEmailVertification } from "@/lib/integrations/appwrite";
import { Avatar, Box, Button, ButtonGroup, Paper, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  if (auth.loading || !auth.user) return <></>;

  const handleVerification = async () => {
    await sendEmailVertification();
    toast.show("Verification email has been sent!", "success");
  };

  const handleGemini = async () => {
    router.push("https://aistudio.google.com/app/plan_information");
  };

  const handleSave = async (data: FormData) => {
    const prefs_geminiApiKey = data.get("prefs-geminiApiKey") as string;
    await account.updatePrefs({
      geminiApiKey: prefs_geminiApiKey,
    });
    toast.show("Your profile has been saved!", "success");
    auth.refresh();
  };

  const handleLogout = () => {
    auth.logout().then(() => router.push("/"));
  };

  return (
    <>
      <Box className={"h-full grid place-items-center"}>
        <Paper component={"form"} className={"p-8 w-[350px]"} variant={"elevation"} action={handleSave}>
          <Box className={"flex flex-col gap-4"}>
            <Avatar className={"mx-auto size-[80px] text-4xl"} sx={{ backgroundColor: blue[800] }}>
              {(auth.user.name ? auth.user.name[0] : auth.user.email[0]).toUpperCase()}
            </Avatar>
            <Box className={"flex flex-col gap-2"}>
              <TextField
                variant={"outlined"}
                size={"small"}
                type={"email"}
                name={"email"}
                label={"Name"}
                value={auth.user.name}
                required
                disabled
              />
              <TextField
                variant={"outlined"}
                size={"small"}
                type={"email"}
                name={"email"}
                label={"Email"}
                value={auth.user.email}
                required
                disabled
              />
              {auth.user.emailVerification || (
                <Button variant={"contained"} color={"success"} onClick={handleVerification}>
                  Verify Email
                </Button>
              )}
              <TextField
                variant={"outlined"}
                size={"small"}
                type={"text"}
                name={"prefs-geminiApiKey"}
                label={"Gemini API Key"}
                defaultValue={auth.user.prefs.geminiApiKey}
              />
              {!!auth.user.prefs.geminiApiKey || (
                <Button variant={"contained"} color={"success"} onClick={handleGemini}>
                  Get API Key now!
                </Button>
              )}
            </Box>
            <ButtonGroup className={"[&>*]:flex-1"}>
              <Button variant={"contained"} color={"info"} type={"submit"}>
                Save
              </Button>
              <Button variant={"contained"} color={"error"} type={"button"} onClick={handleLogout}>
                Logout
              </Button>
            </ButtonGroup>
          </Box>
        </Paper>
      </Box>
    </>
  );
}