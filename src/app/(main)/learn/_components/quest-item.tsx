import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

export default function QuestItem(props: {
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
        <Button>Start</Button>
        <Chip color={props.completed ? "success" : "error"} label={props.completed ? "Completed" : "Incomplete"} />
        <Chip color={"info"} label={`${props.points} points`} />
      </CardActions>
    </Card>
  );
}