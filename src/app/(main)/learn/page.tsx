"use client";

import QuestTab from "@/app/(main)/learn/_components/quest-tab";
import ResourcesTab from "@/app/(main)/learn/_components/resources-tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";

export default function Page() {
  const [tab, setTab] = useState<string>("quests");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Box>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList variant={"fullWidth"} onChange={handleChange}>
            <Tab label={"Quests"} value={"quests"} />
            <Tab label={"Resources"} value={"resources"} />
          </TabList>
        </Box>
        <TabPanel value={"quests"}>
          <QuestTab />
        </TabPanel>
        <TabPanel value={"resources"}>
          <ResourcesTab />
        </TabPanel>
      </TabContext>
    </Box>
  );
}