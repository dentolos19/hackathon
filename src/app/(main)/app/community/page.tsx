import PostItem from "@/app/(main)/app/community/_components/post-item";
import { getPosts } from "@/lib/integrations/appwrite/posts";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Stack } from "@mui/material";
import Link from "next/link";

export const revalidate = 0;

export default async function Page() {
  const posts = await getPosts();
  return (
    <Box>
      <Stack className={"py-4 mx-auto w-[90%] md:w-[70%] lg:w-[50%]"} spacing={1}>
        {posts.map((post) => (
          <PostItem key={post.$id} data={post} />
        ))}
      </Stack>
      <Fab
        LinkComponent={Link}
        className={"fixed right-4 md:right-8 bottom-4 md:bottom-8"}
        href={"/app/community/post"}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}