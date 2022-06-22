import { Box, Avatar, Text } from "@chakra-ui/react";
import {
  PhApertureBold,
  PhHeartStraightFill,
  PhPictureInPictureBold,
} from "../assets/icons";
export function UserProfile({ user, ...props }) {
  return (
    <Box p="8" flexDirection="column" display={"flex"} alignItems="center">
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
          <PhHeartStraightFill /> <Text mx="2">Likes - {user.total_likes}</Text>
        </Box>
        <Box
          ml="1"
          mr="2"
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          <PhApertureBold /> <Text mx="2">Photos - {user.total_photos}</Text>
        </Box>
        <Box display="flex" justifyContent={"center"} alignItems="center">
          <PhPictureInPictureBold />{" "}
          <Text ml="1" mr="2">
            <Text display="inline">Collections -</Text> {user.total_collections}
          </Text>
        </Box>
      </Box>

      <Box display={"flex"}>{/* Render Social Profiles */}</Box>
    </Box>
  );
}
