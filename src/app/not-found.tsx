"use client";

import { Box, Button, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 text-center"} variant={"outlined"}>
        <Typography className={"mb-2 font-bold text-2xl"}>404</Typography>
        <Typography className={"mb-2"} color={"textSecondary"}>The page that you are looking for does not exist!</Typography>
        <Button variant={"outlined"} onClick={() => router.back()}>Back</Button>
      </Paper>
    </Box>
  );
}