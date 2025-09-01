import { Button, Text, Flex, useDisclosure, Input, Textarea, InputGroup, InputLeftAddon, useToast, Checkbox } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { monthNameArrayAtom } from "../Utils/atoms";

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
import api from "../Utils/axios";
import { useRef } from "react";


const CalanderEvent = ({ value }) => {


    // state to controll modal state between event overview and adding guests
    const [addGuest, setAddGuest] = useState(false);



    // useRef to accept data from the frontend
    const guestName = useRef("")
    const guestEmail = useRef("")
    const guestContactNumber = useRef("")
    const guestOtherDetails = useRef("")
    const POCName = useRef("")
    const POCContactNumber = useRef("");



    // adding toast
    const toast = useToast()


    // opening the event overview modal
    const { isOpen, onOpen, onClose } = useDisclosure()
    const openOverView = () => {
        onOpen();
    }


    // opening the add guest modal
    const openAddGuestView = () => {
        setAddGuest((prev) => !prev)
    }

    const closeGuestView = () => {
        setAddGuest((prev) => !prev);
        setTransportation(false)
        onClose();
    }


    // event month number to month name converter
    const monthNameArray = useRecoilValue(monthNameArrayAtom);
    const MonthName = monthNameArray[value.event.eventMonth - 1]







    // add guest Data
    const addGuestData = async () => {



        // handling things incase of an error
        // handling things in case of an error
        if (guestName.current.value == "") {

            toast({
                title: "Missing Guest Name",
                description: "Please enter the name of the Guest before submitting.",
                status: "error",
                isClosable: true,
                position: "top-right"
            })

            return;
        } else if (guestEmail.current.value == "") {

            toast({
                title: "Add Guest Email",
                description: "Please add a valid email for the guest",
                status: "error",
                isClosable: true,
                position: "top-right"
            })

            return;

        } else if (guestContactNumber.current.value == "") {

            toast({
                title: "Guest contact number missing",
                description: "Please add a valid phone number for the guest",
                status: "error",
                isClosable: true,
                position: "top-right"
            })

            return;
        } else if (guestOtherDetails.current.value == "") {

            toast({
                title: "Missing other details",
                description: "A short description helps others understand the details of the guest like are they veg or non veg etc.",
                status: "error",
                isClosable: true,
                position: "top-right"
            })

            return;
        } else if (POCName.current.value == "") {

            toast({
                title: "Please enter a POC Name",
                description: "It makes it easy to coordinate during events",
                status: "error",
                isClosable: true,
                position: "top-right"
            })

            return;
        } else if (POCContactNumber.current.value == "") {

            toast({
                title: "Please enter a POC Contact number",
                description: "It makes it easy to coordinate during events",
                status: "error",
                isClosable: true,
                position: "top-right"
            })

            return;
        }


        const addGuestData = {

            event_id: value.event._id,
            guestName: guestName.current.value,
            guestEmail: guestEmail.current.value,
            guestContactNumber: guestContactNumber.value,
            guestOtherDetails: guestOtherDetails.value,
            POCName: POCName.current.value,
            POCContactNumber: POCContactNumber.current.value
        }


        try {
            const addGuestDataRes = await api.post("/addguestdata", addGuestData)

            addGuestDataRes && toast({
                title: "Sucessfully Added Guest",
                description: "you have sucessfully added a guest to this event",
                status: "success",
                isClosable: true,
                position: "top-right"
            })

            console.log(addGuestDataRes.data)


        } catch (err) {
            console.log(err);
        }



    }


    //checking if the guest require transportation & lodging or not 
    const [transportation, setTransportation] = useState(false);
    console.log(transportation);




    return (<>
        <Flex
            size="sm"
            width="100%"
            justify="start"
            padding="2px"
            paddingLeft="4px"
            backgroundColor="black"
            textColor="white"
            fontSize="sm"
            fontWeight="bold"
            onClick={openOverView}
        >{value.event.eventName}</Flex>

        {!addGuest ?

            <Modal
                size="xl"
                isCentered
                motionPreset='slideInBottom'
                isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {/* Event name */}
                    <ModalHeader fontSize="4xl">{value.event.eventName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody fontSize="md">


                        {/* Date */}
                        <Text><span className="font-bold">Date : </span>{`${value.event.eventDay} ${MonthName} ${value.event.eventYear}`}</Text>


                        {/* Venue */}
                        <Text marginBottom="1rem"><span className="font-bold">Venue : </span>{value.event.eventVenue}</Text>


                        {/* Description */}
                        <Text marginBottom="1rem"><span className="font-bold">Description : </span>{value.event.eventDescription}</Text>


                        {/* Organized By */}
                        <Text ><span className="font-bold">Organized By : </span>{value.event.orgName}</Text>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='black' variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="black"
                            onClick={openAddGuestView}
                        >Add Guest</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



            :


            <Modal size="fit-content"
                isCentered
                motionPreset='slideInBottom'
                isOpen={isOpen}
                
            >
                <ModalOverlay />
                <ModalContent 
                transition="width"
                w="fit-content" maxW="90vw">
                    <ModalHeader fontSize="3xl">Add Guest Info</ModalHeader>
                    <ModalBody className=" flex justify-between">



                        {/* the guest info form */}
                        <FormControl isRequired >


                            {/* Guest Name */}
                            <FormLabel>Guest Name</FormLabel>
                            <Input ref={guestName} type="text" />


                            {/* Guest Email */}
                            <FormLabel>Guest Email</FormLabel>
                            <Input ref={guestEmail} type="email" />

                            {/* Guest Contact Info */}
                            <FormLabel>Guest Contact Number</FormLabel>
                            <InputGroup margin>
                                <InputLeftAddon>+91</InputLeftAddon>
                                <Input ref={guestContactNumber} placeholder="Phone Number" type="number" />
                            </InputGroup>

                            {/* Guest Other Details box */}
                            <FormLabel>Other Details</FormLabel>
                            <Textarea ref={guestOtherDetails} resize="vertical" />


                            {/* Person of contact with the guest ( name ) */}
                            <FormLabel>(POC) Name</FormLabel>
                            <Input ref={POCName} type="text" />


                            {/* person of contact with the guest (contact number ) */}
                            <FormLabel>(POC) Contact Number</FormLabel>
                            <InputGroup margin>
                                <InputLeftAddon>+91</InputLeftAddon>
                                <Input ref={POCContactNumber} placeholder="Phone Number" type="number" />
                            </InputGroup>


                            {/* if the guest require transportation */}
                            <Checkbox
                                onChange={(e) => setTransportation(e.target.checked)}
                            >Does the guest require transportation and lodging
                            </Checkbox>



                        </FormControl>




                        




                        {transportation &&
                        
                        
                        // guest transportation form
                        <FormControl isRequired marginLeft="1rem">


                            {/* Guest Name */}
                            <FormLabel>Guest Name</FormLabel>
                            <Input ref={guestName} type="text" />


                            {/* Guest Email */}
                            <FormLabel>Guest Email</FormLabel>
                            <Input ref={guestEmail} type="email" />

                            {/* Guest Contact Info */}
                            <FormLabel>Guest Contact Number</FormLabel>
                            <InputGroup margin>
                                <InputLeftAddon>+91</InputLeftAddon>
                                <Input ref={guestContactNumber} placeholder="Phone Number" type="number" />
                            </InputGroup>

                            {/* Guest Other Details box */}
                            <FormLabel>Other Details</FormLabel>
                            <Textarea ref={guestOtherDetails} resize="vertical" />


                            {/* Person of contact with the guest ( name ) */}
                            <FormLabel>(POC) Name</FormLabel>
                            <Input ref={POCName} type="text" />


                            {/* person of contact with the guest (contact number ) */}
                            <FormLabel>(POC) Contact Number</FormLabel>
                            <InputGroup margin>
                                <InputLeftAddon>+91</InputLeftAddon>
                                <Input ref={POCContactNumber} placeholder="Phone Number" type="number" />
                            </InputGroup>


                            {/* if the guest require transportation */}
                            <Checkbox
                                onChange={(e) => console.log(e.target.checked)}
                            >Does the guest require transportation and lodging
                            </Checkbox>



                        </FormControl>
                        
                        
                        }
                        
                    

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='black' variant="outline" mr={3} onClick={closeGuestView}>
                        Close
                    </Button>
                    <Button onClick={addGuestData} variant='black'>Add Guest</Button>
                </ModalFooter>
            </ModalContent>
            </Modal >

        }
    </>
    );
}


export default CalanderEvent;





