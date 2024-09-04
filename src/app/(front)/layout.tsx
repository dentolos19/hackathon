import { LayoutProps } from "@/types";
import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";

export default function Layout(props: LayoutProps) {
  return (
    <Box className={"h-full flex flex-col"}>
      <AppBar>
        <Toolbar>
          <Typography className={"flex-1 font-bold text-2xl"}>Pennywise</Typography>
          <Button LinkComponent={Link} color={"inherit"} href={"/app"}>
            Start
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box className={"flex-1"}>{props.children}</Box>
    </Box>
  );
}