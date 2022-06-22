import { Box, Text } from "@chakra-ui/react";
export function EndContent() {
  return (
    <Box mx="20%" p={4} textAlign={"center"}>
      <Text
        background={"linear-gradient(to right, #2193b0, #6dd5ed)"}
        fontWeight="500"
        p={2}
        borderRadius={8}
        fontSize={"xl"}
      >
        {" "}
        Congratulations! You have reached the end!
      </Text>
    </Box>
  );
}
