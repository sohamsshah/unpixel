import { Box, Text } from "@chakra-ui/react";

export function Error({ message, ...props }) {
  return (
    <Box m="auto" height="100vh" width="100vw" {...props}>
      <Text>Something went wrong</Text>
      <Text>{message}</Text>
    </Box>
  );
}
