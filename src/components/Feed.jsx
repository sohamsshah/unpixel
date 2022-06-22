import { Box } from "@chakra-ui/react";
import { FeedPost } from "./FeedPost";
export function Feed({ data }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      justifyContent="center"
    >
      {data?.map((post) => {
        return <FeedPost key={post.id} post={post} />;
      })}
    </Box>
  );
}
