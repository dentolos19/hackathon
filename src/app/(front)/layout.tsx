import { LayoutProps } from "@/types";
import { AppBar, Box, Button, Link, Toolbar } from "@mui/material";

export default function Layout(props: LayoutProps) {
  return (
    <Box className={"h-full flex flex-col"}>
      <AppBar>
        <Toolbar>
          <Box>
            {/* <Typography className={"flex-1 font-bold text-2xl"}>Pennywise</Typography> */}
            <img className={"h-[40px]"} src={"/title.png"} alt={"Title"} />
          </Box>
          <Box className={"flex-1"} />
          <Box>
            <Button LinkComponent={Link} color={"inherit"} href={"/app"}>
              Start
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box className={"flex-1"}>{props.children}</Box>
    </Box>
  );
}