import { getPosts } from "@/lib/integrations/appwrite/utils";
import { humanizeDateString } from "@/lib/utils";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Fab,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

export const revalidate = 0;

export default async function Page() {
  const posts = await getPosts();
  return (
    <Container>
      <Stack padding={2} spacing={2}>
        {posts.map((post, index) => (
          <Card key={index} className={"mx-auto w-[400px]"}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[800] }} aria-label="recipe">
                  {post.author[0].toUpperCase()}
                </Avatar>
              }
              title={post.author}
              subheader={humanizeDateString(post.$createdAt)}
            />
            {post.mediaUrl ?? (
              <CardMedia component={"img"} className={"h-[200px]"} image={post.mediaUrl} alt={"Media"} />
            )}
            <CardContent>
              <Typography color={"textSecondary"}>{post.content}</Typography>
            </CardContent>
            <CardActions>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>
      <Fab className={"fixed right-4 md:right-8 bottom-4 md:bottom-8"}>
        <AddIcon />
      </Fab>
    </Container>
  );
}