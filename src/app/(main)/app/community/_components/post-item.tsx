"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { PostDocument } from "@/lib/integrations/appwrite/types";
import { humanizeDateString } from "@/lib/utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { MouseEvent, useState } from "react";

export default function PostItem(props: { className?: string; data: PostDocument }) {
  const auth = useAuth();
  const toast = useToast();
  const [anchorElement, setAnchorElement] = useState<HTMLElement>();

  const handleMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleEdit = () => {
    toast.show("Function not implemented", "error");
    setAnchorElement(undefined);
  };

  const handleDelete = () => {
    toast.show("Function not implemented", "error");
    setAnchorElement(undefined);
  };

  const handleFavorite = () => {
    toast.show("Function not implemented", "error");
  };

  const handleShare = () => {
    toast.show("Function not implemented", "error");
  };

  return (
    <Card className={props.className}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[800] }}>{props.data.user?.name[0].toUpperCase() || "X"}</Avatar>}
        title={props.data.user?.name || "Unknown User"}
        subheader={humanizeDateString(props.data.$createdAt)}
        action={
          auth.user?.$id === props.data.user?.$id && (
            <>
              <IconButton onClick={handleMore}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorElement} open={!!anchorElement} onClose={() => setAnchorElement(undefined)}>
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </>
          )
        }
      />
      {props.data.mediaUrl && (
        <CardMedia component={"img"} className={"h-[200px]"} image={props.data.mediaUrl} alt={"Media"} />
      )}
      <CardContent>
        <Typography color={"textSecondary"}>{props.data.content}</Typography>
      </CardContent>
      <CardActions>
        <Tooltip title={"Like"}>
          <IconButton onClick={handleFavorite}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={"Share"}>
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}