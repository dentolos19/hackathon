"use client";

import LoadingView from "@/components/views/loading-view";
import NotFoundView from "@/components/views/not-found-view";
import { RouteProps } from "@/types";
import { Box, Card, CardActionArea, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Page(props: RouteProps) {
  const id = props.params.id;

  const [loading, setLoading] = useState(true);
  const [quest, setQuest] = useState<{
    id: string;
    name: string;
    description: string;
    questions: {
      statement: string;
      choices: string[];
      answerIndex: number;
    }[];
  }>();
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    fetch(`/api/quests?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuest(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingView />;
  if (!quest) return <NotFoundView />;

  return (
    <Box className={"h-full grid place-items-center"}>
      <Paper className={"p-8 w-96"} variant={"outlined"}>
        <Box className={"flex flex-col gap-4"}>
          <Typography className={"font-bold text-2xl text-center"}>
            {quest.questions[questionIndex].statement}
          </Typography>
          <Box className={"flex flex-col gap-2"}>
            {quest.questions[questionIndex].choices.map((choice, index) => (
              <Card key={index}>
                <CardActionArea className={"p-2"}>{choice}</CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}