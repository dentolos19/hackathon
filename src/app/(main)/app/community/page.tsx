import { getPosts } from "@/lib/integrations/appwrite/utils";
import { humanizeDateString } from "@/lib/utils";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Container, Fab, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import Link from "next/link";

export const revalidate = 0;

export default async function Page() {
  const posts = await getPosts();
  return (
    <Container>
      <Stack padding={2} spacing={2}>
        {posts.map((post, index) => (
          <Card key={index} className={"mx-auto w-[400px]"}>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: red[800] }}>{post.user?.name[0].toUpperCase() || "X"}</Avatar>}
              title={post.user?.name || "Unknown User"}
              subheader={humanizeDateString(post.$createdAt)}
            />
            {post.mediaUrl && (
              <CardMedia component={"img"} className={"h-[200px]"} image={post.mediaUrl} alt={"Media"} />
            )}
            <CardContent>
              <Typography color={"textSecondary"}>{post.content}</Typography>
            </CardContent>
            {/* <CardActions>
              <IconButton>
                <FavoriteIcon />
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </CardActions> */}
          </Card>
        ))}
      </Stack>
      <Fab
        LinkComponent={Link}
        className={"fixed right-4 md:right-8 bottom-4 md:bottom-8"}
        href={"/app/community/post"}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}