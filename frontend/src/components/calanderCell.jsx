import { Box , Flex , Text, useDisclosure , Button, Input, Textarea, InputGroup, InputLeftAddon, Select, useToast  } from "@chakra-ui/react";
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

import api from "../Utils/axios";
import CalanderEvent from "./calanderEventsInCalanderCells";




const CalanderCells = ({value , keyIndex}) => {

  console.log(value)


    // modal functions
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
    const submitEventCreationForm = async() => {

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



        // destructuring event date into days , months and years
        console.log(eventDate.current.value)

        const fullEventdate = eventDate.current.value
        const year = fullEventdate.slice(0,4)
        const month = String(Number(fullEventdate.slice(5,7)));
        const day = String(Number(fullEventdate.slice(8)));
        // console.log(day)


        // return;


        // sending the form data to the backend

        const eventCreationFormData = {

            eventName:eventName.current.value,
            eventDescription:eventDescription.current.value,
            eventDay:day,
            eventMonth:month,
            eventYear:year,
            eventStartTime:eventStartTime.current.value,
            eventVenue:eventVenue.current.value,
            orgName:orgName.current.value,
            orgContact:orgContact.current.value
        }


        try{

            // sending data to the backend
            const eventCreationFormResponse = await api.post("/eventcreation" , eventCreationFormData )


        }catch(err){
            console.log(err);
        }








        toast({
                title: "Event Successfully Scheduled",
                description: "Your event has been successfully scheduled and is now awaiting review.",
                status:"success",
                isClosable: true,
                position:"top-right"
            })



            return;


    }

    















  return (
    <>
    <Flex
      
      position="relative"
      onClick={onOpen}
      flexDirection="column"
      // maxHeight="8.4rem"
      // minHeight="8.3rem"
      padding="4px"
      border="1px solid #e2e8f0"
      display="flex"
      alignItems="start"
      justifyContent="start"
      bg={value.dayNumber ? "gray.50" : "transparent"}
      _hover={value.dayNumber && { bg: "#ebedf0" }}
    >

      {/* showing the day number */}
      {value.dayNumber && (
        <Text fontSize="sm" fontWeight="medium">
          {value.dayNumber}
        </Text>
      )}


      {/* showing events if any */}
      {value.event && 
      <div className=" overflow-hidden
      flex flex-col
      w-[100%] h-[6rem] absolute cursor-pointer bottom-0 right-0">
      <CalanderEvent value={value}/>
      </div>
      }

    </Flex>



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
