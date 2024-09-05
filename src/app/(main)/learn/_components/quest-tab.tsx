import QuestItem from "@/app/(main)/learn/_components/quest-item";
import quests from "@/content/data/quests.json";
import { Box } from "@mui/material";

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
        />
      ))}
    </Box>
  );
}