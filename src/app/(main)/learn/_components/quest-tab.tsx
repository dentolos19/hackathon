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
    id: "lv1",
    name: "Finance Basics 101",
    description: "Master the essentials like credit scores, bank accounts, and simple debt tips.",
    points: 1000,
    completed: false,
  },
  {
    id: "lv2",
    name: "Investor in Training",
    description: "Learn the ropes of investing with concepts like diversification and mutual funds.",
    points: 2000,
    completed: false,
  },
  {
    id: "lv3",
    name: "Financial Pro Moves",
    description: "Dive deep into advanced topics like compound interest, emergency funds, and portfolio strategy.",
    points: 3000,
    completed: false,
  },
];

export default function QuestTab() {
  return (
    <Box className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"}>
      {quests.map((quest) => (
        <QuestItem
          key={quest.id}
          id={quest.id}
          name={quest.name}
          description={quest.description}
          points={quest.points}
          completed={quest.completed}
        />
      ))}
    </Box>
  );
}