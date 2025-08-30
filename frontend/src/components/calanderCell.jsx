import { Box , Text, useDisclosure , Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

const CalanderCells = ({value , keyIndex}) => {


    // trying to understand the modal
    const { isOpen , onOpen , onClose } = useDisclosure()

    





  return (
    <>
    <Box
      
      onClick={onOpen}
      h=""
      padding="4px"
      border="1px solid #e2e8f0"
      display="flex"
      alignItems="start"
      justifyContent="start"
      bg={value.dayNumber ? "gray.50" : "transparent"}
      _hover={value.dayNumber && { bg: "#ebedf0" }}
    >
      {value.dayNumber && (
        <Text fontSize="sm" fontWeight="medium">
          {value.dayNumber}
        </Text>
      )}
    </Box>



    {/* The modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            This is my 2nd try at this
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CalanderCells;
