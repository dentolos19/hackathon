"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import MessageView from "@/components/views/message-view";
import { sendEmailVertification, updateUserInfo, updateUserPrefs } from "@/lib/auth";
import { Box, Button, ButtonGroup, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  if (auth.loading || !auth.user || !auth.userInfo) return <MessageView title={"Missing Parameters"} />;

  const handleVerification = async () => {
    await sendEmailVertification();
    toast.show({ message: "Verification email has been sent!", severity: "success" });
  };

  const handleGemini = async () => {
    router.push("https://aistudio.google.com/plan_information");
  };

  const handleSave = async (data: FormData) => {
    if (!auth.user) return;

    const user_name = data.get("name") as string;
    const user_description = data.get("description") as string;
    const prefs_geminiApiKey = data.get("prefs-geminiApiKey") as string;

    try {
      await updateUserInfo(auth.user, {
        name: user_name,
        description: user_description,
      });
      await updateUserPrefs({
        geminiApiKey: prefs_geminiApiKey,
      });
    } catch {
      toast.show({ message: "Failed to save settings! Please try again later.", severity: "success" });
    } finally {
      auth.refresh();
      toast.show({ message: "Your settings has been saved!", severity: "success" });
      router.push("/profile");
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 w-96"} variant={"elevation"}>
        <Box component={"form"} className={"flex flex-col gap-4"} action={handleSave}>
          <Typography className={"font-bold text-2xl text-center"}>Settings</Typography>
          <Box className={"flex flex-col gap-2"}>
            <TextField
              variant={"filled"}
              size={"small"}
              type={"text"}
              name={"name"}
              label={"Name"}
              defaultValue={auth.user.name}
              required
            />
            <TextField
              variant={"filled"}
              size={"small"}
              type={"text"}
              name={"description"}
              label={"Description"}
              defaultValue={auth.userInfo.description}
              multiline
            />
            <TextField
              variant={"filled"}
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
              variant={"filled"}
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
            <Button variant={"contained"} color={"error"} type={"button"} onClick={handleCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Paper>
    </Box>
  );
}