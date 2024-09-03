"use client";

import { account } from "@/lib/integrations/appwrite/main";
import { Button, Container, Paper, Typography } from "@mui/material";
import Link from "next/link";
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
    <Container className={"h-full grid place-items-center"}>
      <Paper className={"p-8 text-center"} variant={"outlined"}>
        {verified === undefined && (
          <>
            <Typography className={"font-bold text-2xl"}>Verifying...</Typography>
          </>
        )}
        {verified === true && (
          <>
            <Typography className={"mb-2 font-bold text-2xl"}>Verified!</Typography>
            <Typography className={"mb-2"} color={"textSecondary"}>
              Congratulations! You are ready to roll!
            </Typography>
            <Button LinkComponent={Link} variant={"outlined"} href={"/app"}>
              Continue
            </Button>
          </>
        )}
        {verified === false && (
          <>
            <Typography className={"mb-2 font-bold text-2xl"}>Failed to verify!</Typography>
            <Typography className={"mb-2"} color={"textSecondary"}>
              Sorry about that! Please try again at a later time.
            </Typography>
            <Button LinkComponent={Link} variant={"outlined"} href={"/profile"}>
              Profile
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}