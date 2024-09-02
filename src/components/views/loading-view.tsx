import { Box, CircularProgress } from "@mui/material";

export default function LoadingView() {
  return (
    <Box className={"h-full grid place-items-center"}>
      <CircularProgress />
    </Box>
  )
}