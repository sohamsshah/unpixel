import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
} from "@chakra-ui/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PostImage } from "./PostImage";

export function UserPost({ photo, ...props }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(photo);
  return (
    <Box {...props}>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Box>
              <Box p={8} position="relative">
                <Box display="flex" justifyContent={"center"}>
                  <LazyLoadImage
                    src={photo.urls.small}
                    alt={"Alt"}
                    effect="blur"
                  />
                </Box>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <PostImage handleClick={onOpen} src={photo.urls.small} />
    </Box>
  );
}
