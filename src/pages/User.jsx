import { Box, Button, Divider, Text, Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks";
import { useMemo, useState } from "react";
import { Error } from "../components";
import { PhGridFourBold, PhListBulletsBold } from "../assets/icons";
import { UserPost } from "../components";
import { Layout } from "../components";
import { UserProfile } from "../components/UserProfile";
export function User() {
  const { username } = useParams();
  const [isGridView, setIsGridView] = useState(true);
  const options = useMemo(() => {
    return {
      hashValue: username,
      params: { client_id: "gCB6fUlNGpkD2vn1jNqCwNiGUFzXNRVsNrFvstju4n4" },
    };
  }, [username]);
  const {
    data: user,
    status,
    error,
  } = useFetch(`https://api.unsplash.com/users/${username}`, options);

  function handleView() {
    setIsGridView((prev) => !prev);
  }
  if (status === "error") {
    return <Error message={error} />;
  }

  if (Object.keys(user).length === 0 && status === "fetching") {
    return <Skeleton m="4" height="20rem" />;
  }

  return (
    <Layout>
      {status === "fetched" && (
        <>
          <UserProfile user={user} />
          <Box mx={{ base: "8", md: "32" }} my={16}>
            <Box display="flex" justifyContent={"space-between"}>
              <Text
                fontWeight="bold"
                my="2"
                textTransform="uppercase"
                fontSize="xl"
              >
                Gallery{" "}
              </Text>
              <Button variant="outline" onClick={handleView}>
                {!isGridView ? <PhGridFourBold /> : <PhListBulletsBold />}
              </Button>
            </Box>
            <Divider my="4" />
            <Box
              display="flex"
              flexDirection={isGridView ? "row" : "column"}
              alignItems={isGridView ? "center" : "flex-start"}
              justifyContent="space-between"
              flexWrap={"wrap"}
            >
              {user.photos.map((photo) => {
                return <UserPost my={4} photo={photo} />;
              })}
            </Box>
          </Box>
        </>
      )}
    </Layout>
  );
}
