import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Progress,
  Avatar,
  Link as ChakraLink,
  IconButton,
} from "@chakra-ui/react";
import {
  PhArrowCounterClockwiseFill,
  PhDownloadFill,
  PhHeartStraightFill,
} from "../assets/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PostImage } from "./PostImage";
export function FeedPost({ post, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  console.log(post.links.download);
  const [isModalImageTimerRunning, setIsModalImageTimerRunning] =
    useState(false);
  function handleOpenModal() {
    onOpen();
    setIsModalImageTimerRunning(true);
  }
  useEffect(() => {
    if (isModalImageTimerRunning) {
      setTimeout(() => {
        setIsModalImageTimerRunning(false);
      }, 5000);
    }
  }, [isModalImageTimerRunning]);
  return (
    <Box {...props}>
      <Box>
        <Modal p="20rem" size="4xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent m={4}>
            <ModalCloseButton />
            <ModalHeader>
              {isModalImageTimerRunning && (
                <Progress
                  animation={"roundtime calc(5 * 1s) linear forwards"}
                  background={"linear-gradient(to right, #2193b0, #6dd5ed)"}
                  transformOrigin="left center"
                  height={"5px"}
                  sx={{
                    "@keyframes roundtime": {
                      to: {
                        transform: "scaleX(0)",
                      },
                    },
                  }}
                />
              )}
            </ModalHeader>

            <ModalBody>
              <Box>
                <Box p={8} position="relative">
                  {!isModalImageTimerRunning ? (
                    <Box>
                      <Box
                        top="0"
                        bottom="0"
                        left="0"
                        right="0"
                        transition="ease 0.2s"
                        position="absolute"
                        bg={"black"}
                        opacity="0.9"
                        display="flex"
                        justifyContent="center"
                        alignItems={"center"}
                        zIndex="10"
                      ></Box>
                      <Box
                        display="flex"
                        justifyContent={"center"}
                        alignItems="center"
                        color="white"
                        height="100%"
                        w="100%"
                        top="0"
                        bottom="0"
                        left="0"
                        right="0"
                        zIndex="11"
                        position="absolute"
                      >
                        <Box>
                          <Box
                            display={"flex"}
                            flexDirection="column"
                            justifyContent={"center"}
                            alignItems="center"
                          >
                            <Avatar
                              size={{ base: "md", md: "xl" }}
                              border="solid 1px white"
                              src={post.user.profile_image.medium}
                            />
                            <Box textAlign={"center"}>
                              <Text my="1" fontWeight={"bold"} fontSize="2xl">
                                {post.user.first_name}
                              </Text>
                              <Text mb="1">{`@${post.user.username}`}</Text>
                            </Box>
                          </Box>
                          <Box
                            display={"flex"}
                            alignItems="center"
                            justifyContent={"center"}
                          >
                            <Button
                              size={{ base: "sm", md: "md" }}
                              my="4"
                              mr={3}
                              variant="outline"
                              color="white"
                              sx={{ opacity: "1 !important" }}
                              _hover={{ color: "black", bgColor: "white" }}
                              onClick={() =>
                                navigate(`/users/${post.user.username}`)
                              }
                            >
                              {" "}
                              See Profile
                            </Button>
                            <Button
                              size={{ base: "sm", md: "md" }}
                              mr={3}
                              variant="outline"
                              color="white"
                              _hover={{ color: "black", bgColor: "white" }}
                              border={"none"}
                              leftIcon={<PhArrowCounterClockwiseFill />}
                              onClick={() => setIsModalImageTimerRunning(true)}
                            >
                              Watch Again
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    ""
                  )}
                  <Box display="flex" justifyContent={"center"}>
                    <LazyLoadImage
                      src={post.urls.small}
                      alt={post.description ?? "Unsplash Image"}
                      effect="blur"
                    />
                  </Box>
                </Box>
                <Box
                  py={4}
                  display="flex"
                  justifyContent={"space-between"}
                  alignItems="center"
                >
                  <Box>
                    <Text display="flex" alignItems="center">
                      <PhHeartStraightFill color="tomato" fontSize="30px" />
                      <Text px="1" fontWeight="500" fontSize={"lg"}>
                        {post.likes}{" "}
                      </Text>
                    </Text>
                    <Text p="1" fontSize={"xs"} textTransform="uppercase">
                      {new Date(post.created_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                    </Text>
                    <Box mt={4}>
                      {post.tags.map((tag, index) => {
                        return (
                          <Text
                            key={index}
                            borderRadius={8}
                            mr={2}
                            display="inline"
                            border="solid 1px #C0C0C0"
                            px={2}
                            py={1}
                          >
                            {tag.title}
                          </Text>
                        );
                      })}
                    </Box>
                  </Box>
                  <a
                    aria-label="Download Link"
                    href={`${post.links.download}?force=true`}
                  >
                    <IconButton
                      p={2}
                      variant="outline"
                      icon={<PhDownloadFill fontSize="40px" />}
                    />
                  </a>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
      <Box
        p={4}
        borderRadius={24}
        boxShadow="base"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        m="4"
      >
        <PostImage
          post={post}
          src={post.urls.small}
          handleClick={handleOpenModal}
        />
        <Box>
          ???? Photo by:{" "}
          <Link as={NavLink} to={`/users/${post.user.username}`}>
            <Text
              my={2}
              fontWeight={"bold"}
              _hover={{ textDecoration: "underline" }}
              display={"inline-block"}
            >
              {post.user.username}
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
