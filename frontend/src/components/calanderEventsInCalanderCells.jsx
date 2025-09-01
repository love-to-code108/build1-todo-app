import { Button, Text, Flex, useDisclosure } from "@chakra-ui/react";
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


const CalanderEvent = ({ value }) => {


    // state to controll modal state between event overview and adding guests
    const [addGuest, setAddGuest] = useState(false);



    // event overview 
    console.log(value.event)


    // working with the modals
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleOnClick = () => {

        onOpen();
        console.log("The Button is working")
    }


    // event month number to month name converter
    const monthNameArray = useRecoilValue(monthNameArrayAtom);
    const MonthName = monthNameArray[value.event.eventMonth - 1]
    console.log(MonthName);





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
            onClick={handleOnClick}
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
                        <Button variant="black">Add Guest</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>



            :


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        }
    </>
    );
}


export default CalanderEvent;





