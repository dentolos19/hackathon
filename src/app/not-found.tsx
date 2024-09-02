import { Box, Paper, Typography } from "@mui/material";

export default function Page() {
  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 text-center"} variant={"outlined"}>
        <Typography className={"mb-2 font-bold text-2xl"}>404</Typography>
        <Typography color={"textSecondary"}>The page that you are looking for does not exist!</Typography>
      </Paper>
    </Box>
  );
}