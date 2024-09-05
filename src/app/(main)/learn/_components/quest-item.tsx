import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";
import Link from "next/link";

export default function QuestItem(props: {
  id: string;
  name: string;
  description: string;
  points: number;
  completed: boolean;
}) {
  return (
    <Card className={"h-fit"}>
      <CardContent>
        <Typography className={"text-2xl"} gutterBottom>
          {props.name}
        </Typography>
        <Typography color={"textSecondary"}>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button LinkComponent={Link} href={`/learn/${props.id}`}>Start</Button>
        {/* <Chip color={props.completed ? "success" : "error"} label={props.completed ? "Completed" : "Incomplete"} /> */}
        <Chip color={"info"} label={`${props.points} points`} />
      </CardActions>
    </Card>
  );
}