import { Box, Button, Image, Input, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { PhGithubLogoFill } from "../assets/icons";
import UnPixel from "../assets/unPIXEL.svg";
import { SearchBox } from "./SearchBox";
export function Navbar({ hasSearchBox = true, ...props }) {
  const navigate = useNavigate();
  function handleSearch(query) {
    navigate(`/search/${query}`);
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      my={8}
      mx={24}
      {...props}
    >
      <Image w={100} h={100} src={UnPixel} />
      {hasSearchBox && <SearchBox handleSearch={handleSearch} />}
      <Link href={"https://github.com/sohamsshah"} isExternal>
        <PhGithubLogoFill fontSize="40px" />
      </Link>
    </Box>
  );
}
