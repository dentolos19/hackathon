"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/providers/toast-provider";
import { PostDocument } from "@/lib/integrations/appwrite/types";
import { deletePost } from "@/lib/posts";
import { humanizeDate } from "@/lib/utils";
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
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

export default function PostItem(props: { className?: string; data: PostDocument }) {
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  const [anchorElement, setAnchorElement] = useState<HTMLElement>();

  const handleMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleEdit = () => {
    router.push(`/community/${props.data.$id}`);
  };

  const handleDelete = async () => {
    try {
      await deletePost(props.data.$id);
      toast.show({ message: "Post deleted!", severity: "success" });
      window.location.reload(); // TODO: replace with better reloading mechanism
    } catch (err) {
      console.log(err);
      toast.show({ message: "Failed to delete post!", severity: "error" });
    }
    setAnchorElement(undefined);
  };

  const handleFavorite = () => {
    toast.show({ message: "Function not implemented.", severity: "error" });
  };

  const handleShare = () => {
    toast.show({ message: "Function not implemented.", severity: "error" });
  };

  return (
    <Card className={props.className}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[800] }}>{props.data.user?.name[0].toUpperCase() || "X"}</Avatar>}
        title={props.data.user?.name || "Unknown User"}
        subheader={humanizeDate(props.data.$createdAt)}
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