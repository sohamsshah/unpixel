import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

export function SearchBox({ handleSearch, ...props }) {
  const [query, setQuery] = useState("");
  return (
    <Box display={"flex"} alignItems="center" {...props}>
      <Input
        mr="4"
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Image"
        w={"28rem"}
      />
      <Button type="submit" onClick={() => handleSearch(query)}>
        Search
      </Button>
    </Box>
  );
}
