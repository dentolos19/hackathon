import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

export default function ResourceItem(props: { name: string; description: string; url: string; imageUrl: string }) {
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
        <Button LinkComponent={Link} href={props.url}>
          Read more
        </Button>
      </CardActions>
    </Card>
  );
}