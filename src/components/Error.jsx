import { Box, Text } from "@chakra-ui/react";

export function Error({ message }) {
  return (
    <Box m="auto" height="100vh" width="100vw">
      <Text>Something went wrong</Text>
      <Text>{message}</Text>
    </Box>
  );
}
