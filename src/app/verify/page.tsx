"use client";

import { account } from "@/lib/integrations/appwrite";
import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page() {
  const [verified, setVerified] = useState<boolean | undefined>();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const userId = searchParams.get("userId");
    const secret = searchParams.get("secret");

    if (!userId || !secret) {
      setVerified(false);
      return;
    }

    account
      .updateVerification(userId, secret)
      .then(() => {
        setVerified(true);
      })
      .catch(() => {
        setVerified(false);
      });
  }, []);

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 text-center"} variant={"outlined"}>
        <Typography className={"mb-2 font-bold text-2xl"}>
          {verified === undefined && <>Verifying...</>}
          {verified === true && <>Verified!</>}
          {verified === false && <>Failed to verify</>}
        </Typography>
      </Paper>
    </Box>
  );
}