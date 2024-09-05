"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import FormStatus from "@/components/ui/form-button";
import { updateUserInfo } from "@/lib/auth";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Typography } from "@mui/material";

export default function ShopItem(props: { name: string; description?: string; points: number; imageUrl: string }) {
  const auth = useAuth();
  const toast = useToast();

  const handleBuy = async () => {
    if (!auth.user || !auth.userInfo) return;
    if (auth.userInfo.points < props.points) {
      toast.show({
        message: "You don't have enough points to buy this item!",
        severity: "error",
      });
    } else {
      await updateUserInfo(auth.user.$id, { points: auth.userInfo.points - props.points }).then(() => {
        auth.refresh();
        toast.show({
          message: "Item bought successfully! Please check your email for more details.",
          severity: "success",
        });
      });
    }
  };

  return (
    <Card component={"form"} className={"flex flex-col"} action={handleBuy}>
      <CardMedia className={"h-[150px]"} image={props.imageUrl} />
      <CardContent className={"flex-1"}>
        <Typography className={"text-2xl"} gutterBottom>
          {props.name}
        </Typography>
        <Typography color={"textSecondary"}>{props.description}</Typography>
      </CardContent>
      <CardActions>
        <FormStatus>
          <FormStatus.Active>
            <Button type={"submit"}>Buy</Button>
          </FormStatus.Active>
          <FormStatus.Pending>
            <Button disabled>Buying...</Button>
          </FormStatus.Pending>
        </FormStatus>
        <Chip label={`${props.points} points`} />
      </CardActions>
    </Card>
  );
}