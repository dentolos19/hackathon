import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import { Box, Container, Fab, Link, Stack } from "@mui/material";

const quests = [
  {
    id: "q1",
    name: "Quest #1",
    status: "completed",
  },
  {
    id: "q2",
    name: "Quest #2",
    status: "incomplete",
  },
  {
    id: "q3",
    name: "Quest #3",
    status: "incomplete",
  },
];

export default function Page() {
  return (
    <Container>
      <Stack padding={4} spacing={2}>
        {quests.map((quest) => (
          <Fab
            LinkComponent={Link}
            key={quest.id}
            className={"mx-auto w-fit"}
            variant={"extended"}
            size={"large"}
            color={quest.status === "completed" ? "success" : "primary"}
            href={`/app/quests/${quest.id}`}
          >
            {quest.status === "completed" ? <CheckIcon /> : <StarIcon />}
            <Box className={"ml-1"}>{quest.name}</Box>
          </Fab>
        ))}
      </Stack>
    </Container>
  );
}