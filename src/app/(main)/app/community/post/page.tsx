"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { createPost } from "@/lib/integrations/appwrite/posts";
import { Box, Button, ButtonGroup, Paper, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  const handlePost = async (data: FormData) => {
    if (!auth.user) return;
    const content = data.get("content") as string;
    createPost(auth.user, { content });
    toast.show({ message: "Your post has been created!", severity: "success" });
    router.push("/app/community");
  };

  const handleCancel = () => {
    router.push("/app/community");
  };

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 w-96"} variant={"outlined"}>
        <Box component={"form"} className={"flex flex-col gap-4"} action={handlePost}>
          <Typography className={"font-bold text-2xl text-center"}>Create Post</Typography>
          <Box className={"flex flex-col gap-2"}>
            <TextField
              variant={"filled"}
              size={"small"}
              type={"text"}
              name={"content"}
              placeholder={"Content"}
              hiddenLabel
              multiline
              required
            />
          </Box>
          <ButtonGroup className={"[&>*]:flex-1"}>
            <Button variant={"contained"} color={"primary"} type={"submit"}>
              Post
            </Button>
            <Button variant={"outlined"} color={"secondary"} type={"button"} onClick={handleCancel}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </Paper>
    </Box>
  );
}