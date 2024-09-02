"use client";

import { account } from "@/lib/integrations/appwrite";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    account
      .get()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));
  }, []);

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton className={"mr-2"} size={"large"} edge={"start"} color={"inherit"}>
              <MenuIcon />
            </IconButton> */}
            <Typography component={"div"} className={"flex-1"} variant={"h6"}>
              Pennywise
            </Typography>
            {loggedIn ? (
              <Button LinkComponent={Link} color={"inherit"} href={"/app"}>
                App
              </Button>
            ) : (
              <Button LinkComponent={Link} color={"inherit"} href={"/auth"}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}