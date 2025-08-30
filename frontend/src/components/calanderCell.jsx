import { Box , Text, useDisclosure , Button, Input, Textarea, InputGroup, InputLeftAddon, Select, useToast  } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'

import { useRef } from "react";

const CalanderCells = ({value , keyIndex}) => {


    // trying to understand the modal
    const { isOpen , onOpen , onClose } = useDisclosure()


    // all the useRefs for the form
    const eventName = useRef(null);
    const eventDescription = useRef(null);
    const eventDate = useRef(null);
    const eventStartTime = useRef(null);
    const eventVenue = useRef(null);
    const orgName = useRef(null);
    const orgContact = useRef(null);

    // init toast 
    const toast = useToast()


    // event creation form funciton
    const submitEventCreationForm = () => {

        console.log(eventName.current.value)

        if(eventName.current.value == ""){

            toast({
                title: "Missing Event Name",
                description: "Please enter the name of the event before submitting.",
                status:"error",
                isClosable: true,
                position:"top-right"
            })

            return;
        }else if(eventDescription.current.value == ""){

            toast({
                title: "Add Event Description",
                description: "A short description helps others understand the purpose of the event.",
                status:"error",
                isClosable: true,
                position:"top-right"
            })

            return;

        }else if(eventDate.current.value == ""){

            toast({
                title: "Invalid Date",
                description: "Please select a valid date for the event.",
                status:"error",
                isClosable: true,
                position:"top-right"
            })

            return;
        }else if(eventStartTime.current.value == ""){

            toast({
                title: "Missing Start Time",
                description: "Don’t forget to add when the event will begin.",
                status:"error",
                isClosable: true,
                position:"top-right"
            })

            return;
        }else if(eventVenue.current.value == ""){

            toast({
                title: "Select Venue",
                description: "Please choose a seminar hall for the event.",
                status:"error",
                isClosable: true,
                position:"top-right"
            })

            return;
        }else if(orgName.current.value == ""){

            toast({
                title: "Organization Required",
                description: "Enter the name of the organizing club or department.",
                status:"error",
                isClosable: true,
                position:"top-right"
            })

            return;
        }else if(orgContact.current.value == ""){

            toast({
                title: "Contact Info Missing",
                description: "Provide a valid contact number for coordination.",
                status:"error",
                isClosable: true,
                position:"top-right"
            })

            return;
        }





    }

    





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
    { value.dayNumber && 
      <Modal 
      size="xl"
      isCentered
      isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl">Create New Event</ModalHeader>
          <ModalCloseButton />

          {/* the form inside the modal */}
          <ModalBody>
            <FormControl isRequired>


                {/* Event Name */}
                <FormLabel>Event Name</FormLabel>
                <Input ref={eventName} marginBottom="1rem" placeholder="Name of the event" type="text"/>


                {/* Description */}
                <FormLabel>Description</FormLabel>
                <Textarea ref={eventDescription} marginBottom="1rem" placeholder="Description of the Event" resize="vertical"/>


                {/* Date of Event*/}
                <FormLabel>Date</FormLabel>
                <Input ref={eventDate} marginBottom="1rem" type="date"/>


                {/*Start Time of Event */}
                <FormLabel>Start Time</FormLabel>
                <Input ref={eventStartTime} marginBottom="1rem" placeholder="9:00AM" type="time"/>



                {/* Venu */}
                <FormLabel>Venue </FormLabel>
                <Select ref={eventVenue} marginBottom="1rem" >
                    <option>Basement Seminar Hall</option>
                    <option>First Floor Seminar Hall</option>
                    <option>Mini Seminar Hall</option>
                </Select>


                {/* Organization Name */}
                <FormLabel>Organization Name</FormLabel>
                <Input ref={orgName} marginBottom="1rem"  type="text"/>


                {/* Organization Contact Info  */}
                <FormLabel>Organization Contact Number</FormLabel>
                <InputGroup margin>
                    <InputLeftAddon>+91</InputLeftAddon>
                    <Input ref={orgContact} placeholder="Phone Number" type="number"/>
                </InputGroup>

            </FormControl>
          </ModalBody>

          <ModalFooter >
            <Button onClick={submitEventCreationForm} variant="black">
              Submit
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    }
    </>
  );
};

export default CalanderCells;
