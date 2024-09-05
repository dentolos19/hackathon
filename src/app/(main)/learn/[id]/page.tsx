"use client";

import LoadingView from "@/components/views/loading-view";
import NotFoundView from "@/components/views/not-found-view";
import { RouteProps } from "@/types";
import { Box, Button, Card, CardActionArea, Chip, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page(props: RouteProps) {
  const id = props.params.id;

  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"start" | "questions" | "end">("start");
  const [quest, setQuest] = useState<{
    id: string;
    name: string;
    description: string;
    points: string;
    questions: {
      statement: string;
      choices: string[];
      answerIndex: number;
    }[];
  }>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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

  const createAnswerHandler = (choiceIndex: number) => {
    return () => {
      if (choiceIndex === quest.questions[questionIndex].answerIndex) setCorrectAnswers((prev) => prev + 1);
      if (questionIndex === quest.questions.length - 1) {
        setPhase("end");
      } else {
        setQuestionIndex((prev) => prev + 1);
      }
    };
  };

  const handleReset = () => {
    setPhase("start");
    setQuestionIndex(0);
    setCorrectAnswers(0);
  };

  if (phase === "start")
    return (
      <Box className={"h-full grid place-items-center"}>
        <Paper className={"p-8 w-96"} variant={"outlined"}>
          <Box className={"flex flex-col gap-4 text-center"}>
            <Box>
              <Typography className={"font-bold text-4xl"} gutterBottom>
                {quest.name}
              </Typography>
              <Typography color={"textSecondary"} gutterBottom>
                {quest.description}
              </Typography>
              <Chip label={`${quest.points} points`} />
            </Box>
            <Button variant={"contained"} color={"primary"} onClick={() => setPhase("questions")}>
              Begin
            </Button>
          </Box>
        </Paper>
      </Box>
    );

  if (phase === "end" && correctAnswers === quest.questions.length - 1)
    return (
      <Box className={"h-full grid place-items-center"}>
        <Paper className={"p-8 w-96"} variant={"outlined"}>
          <Box className={"flex flex-col gap-4 text-center"}>
            <Typography className={"font-bold text-4xl"} gutterBottom>
              You've passed!
            </Typography>
            <Typography color={"textSecondary"}>Congratulations! You have earned {quest.points} points!</Typography>
            <Button LinkComponent={Link} variant={"contained"} color={"primary"} href={"/app"}>
              Home
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  else if (phase === "end" && correctAnswers < quest.questions.length - 1)
    return (
      <Box className={"h-full grid place-items-center"}>
        <Paper className={"p-8 w-96"} variant={"outlined"}>
          <Box className={"flex flex-col gap-4 text-center"}>
            <Box>
              <Typography className={"font-bold text-4xl"} gutterBottom>
                You've failed!
              </Typography>
              <Typography color={"textSecondary"}>Keep going! It is never too late to give up!</Typography>
            </Box>
            <Button variant={"contained"} color={"primary"} onClick={handleReset}>
              Try Again
            </Button>
            <Button LinkComponent={Link} variant={"contained"} color={"secondary"} href={"/app"}>
              Home
            </Button>
          </Box>
        </Paper>
      </Box>
    );

  if (phase === "questions")
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
                  <CardActionArea className={"p-2"} onClick={createAnswerHandler(index)}>
                    {choice}
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>
        </Paper>
      </Box>
    );
}