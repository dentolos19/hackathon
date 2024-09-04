import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";

export default function ShopItem(props: { name: string; description?: string; points: number; imageUrl: string }) {
  return (
    <Card className={"h-fit"}>
      <CardMedia className={"h-[150px]"} image={props.imageUrl} />
      <CardContent>
        <Typography className={"text-2xl"} gutterBottom>
          {props.name}
        </Typography>
        <Typography color={"textSecondary"}>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <Button>Buy</Button>
        <Chip label={`${props.points} points`} />
      </CardActions>
    </Card>
  );
}