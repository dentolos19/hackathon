"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import LoadingView from "@/components/views/loading-view";
import NotFoundView from "@/components/views/not-found-view";
import { updateUserInfo } from "@/lib/auth";
import { RouteProps } from "@/types";
import { Box, Button, Card, CardActionArea, Chip, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page(props: RouteProps) {
  const id = props.params.id;

  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState<"start" | "questions" | "end">("start");
  const [lesson, setLesson] = useState<{
    id: string;
    name: string;
    description: string;
    points: number;
    questions: {
      statement: string;
      choices: string[];
      answerIndex: number;
    }[];
  }>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    fetch(`/api/lessons?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLesson(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingView />;
  if (!lesson) return <NotFoundView />;

  const createAnswerHandler = (choiceIndex: number) => {
    return () => {
      if (choiceIndex === lesson.questions[questionIndex].answerIndex) setCorrectAnswers((prev) => prev + 1);
      if (questionIndex === lesson.questions.length - 1) {
        setPhase("end");
      } else {
        setQuestionIndex((prev) => prev + 1);
      }
    };
  };

  const handleComplete = () => {
    if (!auth.user || !auth.userInfo) return;
    updateUserInfo(auth.user.$id, { points: auth.userInfo.points + lesson.points }).then(() => {
      toast.show({
        message: `You have earned ${lesson.points} points!`,
        severity: "info",
      });
      auth.refresh();
      router.push("/app");
    });
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
                {lesson.name}
              </Typography>
              <Typography color={"textSecondary"} gutterBottom>
                {lesson.description}
              </Typography>
              <Chip label={`${lesson.points} points`} />
            </Box>
            <Button variant={"contained"} color={"primary"} onClick={() => setPhase("questions")}>
              Begin
            </Button>
          </Box>
        </Paper>
      </Box>
    );

  if (phase === "end" && correctAnswers === lesson.questions.length)
    return (
      <Box className={"h-full grid place-items-center"}>
        <Paper className={"p-8 w-96"} variant={"outlined"}>
          <Box className={"flex flex-col gap-4 text-center"}>
            <Typography className={"font-bold text-4xl"} gutterBottom>
              You've passed!
            </Typography>
            <Typography color={"textSecondary"}>Congratulations! You have earned {lesson.points} points!</Typography>
            <Button variant={"contained"} color={"primary"} onClick={handleComplete}>
              Home
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  else if (phase === "end" && correctAnswers < lesson.questions.length - 1)
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
              {lesson.questions[questionIndex].statement}
            </Typography>
            <Box className={"flex flex-col gap-2"}>
              {lesson.questions[questionIndex].choices.map((choice, index) => (
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