import { Box, Button } from "@mantine/core";
import Link from "next/link";

export default function Page() {
  return (
    <Box>
      <Button component={Link} href={"/auth"}>
        Login
      </Button>
    </Box>
  );
}