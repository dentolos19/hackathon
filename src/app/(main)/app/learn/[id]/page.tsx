import { RouteProps } from "@/types";
import { Box, Container } from "@mui/material";

export default function Page(props: RouteProps) {
  const id = props.params.id;
  return (
    <Container>
      <Box>{id}</Box>
    </Container>
  );
}