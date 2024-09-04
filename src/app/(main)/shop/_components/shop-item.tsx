import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";

export default function ShopItem() {
  return (
    <Card className={"h-fit"}>
      <CardMedia
        className={"h-[200px]"}
        image="https://mui.com//static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography className={"text-2xl"} gutterBottom>
          Test Item
        </Typography>
        <Typography color={"textSecondary"}>This is just a fake item.</Typography>
      </CardContent>
      <CardActions>
        <Button>Buy</Button>
        <Chip label={"1,500 points"} />
      </CardActions>
    </Card>
  );
}