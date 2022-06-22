import { Avatar, Box, Button, Divider, Text, Skeleton } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useMemo, useState } from "react";
import { Error } from "../components/Error";
import {
  PhApertureBold,
  PhGridFourBold,
  PhHeartStraightFill,
  PhListBulletsBold,
  PhPictureInPictureBold,
} from "../assets/icons";
import { UserPost } from "../components/UserPost";
import { Layout } from "../components/Layout";
export function User() {
  const { username } = useParams();
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

  const [isGridView, setIsGridView] = useState(true);

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
          <Box
            p="8"
            flexDirection="column"
            display={"flex"}
            alignItems="center"
          >
            <Avatar size="4xl" src={user.profile_image.large} />
            <Box py="4" px="32" textAlign={"center"}>
              <Text fontWeight="bold" fontSize={"4xl"}>
                {user.first_name}{" "}
              </Text>
              <Text color="#696969">{`@${user.username}`} </Text>
              {user.bio && (
                <Text mt="2" fontSize={"lg"}>
                  {user.bio}
                </Text>
              )}
            </Box>
            <Box display={"flex"} justifyContent="center" alignItems={"center"}>
              <Text mr="2" fontWeight="bold" fontSize={"xl"}>
                {user.followers_count} Followers
              </Text>
              <Text mr="2" fontSize="4xl">
                ·
              </Text>
              <Text mr="2" fontWeight="bold" fontSize={"xl"}>
                {user.following_count} Following
              </Text>
            </Box>
            <Box display="flex" justifyContent={"center"} alignItems="center">
              <Box
                ml="1"
                mr="2"
                display="flex"
                justifyContent={"center"}
                alignItems="center"
              >
                <PhHeartStraightFill />{" "}
                <Text mx="2">Likes - {user.total_likes}</Text>
              </Box>
              <Box
                ml="1"
                mr="2"
                display="flex"
                justifyContent={"center"}
                alignItems="center"
              >
                <PhApertureBold />{" "}
                <Text mx="2">Photos - {user.total_photos}</Text>
              </Box>
              <Box display="flex" justifyContent={"center"} alignItems="center">
                <PhPictureInPictureBold />{" "}
                <Text ml="1" mr="2">
                  <Text display="inline">Collections -</Text>{" "}
                  {user.total_collections}
                </Text>
              </Box>
            </Box>

            <Box display={"flex"}>{/* Render Social Profiles */}</Box>
          </Box>
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
