"use client";

import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <Box className={"h-full grid grid-rows-[auto,1fr]"}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography component={"div"} className={"flex-1 font-bold text-2xl"}>
              Pennywise
            </Typography>
            <Tooltip title={"Start"} placement={"left"}>
              <IconButton LinkComponent={Link} href={"/app"}>
                <PlayCircleFilledIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
      <Box>
        <Container className={"max-md:py-24 h-full flex max-md:flex-col-reverse md:[&>*]:flex-1 md:gap-8"}>
          <Box className={"flex-1 flex flex-col max-md:items-center justify-center"}>
            <Typography className={"font-bold text-4xl max-md:text-center"}>Welcome to Pennywise</Typography>
            <Typography className={"mt-4 max-md:text-center"}>
              Pennywise is a simple budgeting app that helps you track your expenses and income.
            </Typography>
            <Button LinkComponent={Link} className={"mt-8 w-fit"} variant={"contained"} href={"/app"}>
              Get Started
            </Button>
          </Box>
          <Box className={"max-md:h-[40%] flex items-center justify-center"}>
            <img className={"h-[300px] max-md:h-[150px]"} src={"/assets/money-bag.png"} alt={"Landing"} />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}