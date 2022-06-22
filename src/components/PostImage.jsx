import { Box } from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
export function PostImage({ post, src, handleClick, ...props }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
      {...props}
    >
      <Box
        onClick={() => handleClick()}
        cursor={"zoom-in"}
        _hover={{
          transform: "scale(1.2)",
          transition: "ease-in 0.5s",
          filter: "brightness(70%)",
        }}
      >
        <LazyLoadImage
          src={src}
          alt={post.description ?? "Unsplash Image"}
          effect="blur"
        />
      </Box>
    </Box>
  );
}
