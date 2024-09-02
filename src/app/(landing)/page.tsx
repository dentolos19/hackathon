"use client";

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <Box className={"h-full grid grid-rows-[auto,1fr]"}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton className={"mr-2"} size={"large"} edge={"start"} color={"inherit"}>
              <MenuIcon />
            </IconButton> */}
            <Typography component={"div"} className={"flex-1"} variant={"h6"}>
              Pennywise
            </Typography>
            <Button LinkComponent={Link} color={"inherit"} href={"/app"}>
              Start
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box className={"h-full grid place-items-center"}>Hello, world!</Box>
    </Box>
  );
}