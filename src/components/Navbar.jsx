import { Box, Image, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { PhGithubLogoFill } from "../assets/icons";
import UnPixel from "../assets/unPIXEL.svg";
import { GITHUB_URL } from "../static/constants";
import { SearchBox } from "./SearchBox";
export function Navbar({ hasSearchBox = true, ...props }) {
  const navigate = useNavigate();
  function handleSearch(query) {
    navigate(`/search/${query}`);
  }
  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      alignItems={{ base: "center" }}
      justifyContent={{ base: "flex-start", md: "space-between" }}
      my={8}
      mx={{ base: "8", md: "12", lg: "24" }}
      {...props}
    >
      <Link as={NavLink} to="/">
        <Image w={100} h={100} src={UnPixel} />
      </Link>
      <Box display={"flex"} flexWrap="wrap">
        {hasSearchBox && <SearchBox mr="4" handleSearch={handleSearch} />}
        <Link href={GITHUB_URL} isExternal>
          <PhGithubLogoFill fontSize="40px" />
        </Link>
      </Box>
    </Box>
  );
}
