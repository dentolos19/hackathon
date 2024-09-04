import QuestItem from "@/app/(main)/learn/_components/quest-item";
import { Box } from "@mui/material";

const quests: {
  id: string;
  name: string;
  description: string;
  points: number;
  completed: boolean;
}[] = [
  {
    id: "q1",
    name: "Quest #1",
    description: "To be added.",
    points: 100,
    completed: false,
  },
  {
    id: "q2",
    name: "Quest #2",
    description: "To be added.",
    points: 100,
    completed: false,
  },
  {
    id: "q3",
    name: "Quest #3",
    description: "To be added.",
    points: 100,
    completed: false,
  },
];

export default function QuestTab() {
  return (
    <Box className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"}>
      {quests.map((quest) => (
        <QuestItem
          key={quest.id}
          name={quest.name}
          description={quest.description}
          points={quest.points}
          completed={quest.completed}
        />
      ))}
    </Box>
  );
}