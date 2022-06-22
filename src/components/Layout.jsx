import { Box } from "@chakra-ui/react";
import { Navbar } from "./Navbar";
export function Layout({ hasSearchBox, children }) {
  return (
    <Box>
      <Navbar hasSearchBox={hasSearchBox} />
      {children}
    </Box>
  );
}
