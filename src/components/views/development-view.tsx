import { Box, Paper, Typography } from "@mui/material";

export default function DevelopmentView() {
  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 text-center"} variant={"outlined"}>
        <Typography className={"mb-2 font-bold text-2xl"}>Coming Soon!</Typography>
        <Typography color={"textSecondary"}>This page is currently being built. Let me cook!</Typography>
      </Paper>
    </Box>
  );
}