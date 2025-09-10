import { Flex, useDisclosure, Button, Text, useToast } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useRecoilValue } from "recoil";
import { monthNameArrayAtom } from "../../Utils/atoms";





const CalanderRegisterOnlyCell = ({ value }) => {



    // init
    const { isOpen, onOpen, onClose } = useDisclosure()
    const monthNameArray = useRecoilValue(monthNameArrayAtom)
    const toast = useToast()


    // getting the month
    const MonthName = monthNameArray[value.eventMonth - 1]




    // register for the event
    const registerForEventFunction = () => {

        if (value.registrationLink) {
            window.open(value.registrationLink, "blank")
        }

        else {

            toast({
                title: "This event is not accepting registrations yet",
                status: "error",
                isClosable: "true",
                position: "top-right"
            })
        }
    }



    return (
        <div>


            {/* showing the event name */}
            <Flex
                size="sm"
                marginBottom="4px"
                width="100%"
                justify="start"
                padding="2px"
                paddingLeft="4px"
                backgroundColor={value.approved ? "#23AF00" : "#2D88FE"}
                textColor="white"
                borderRadius={4}
                fontSize="sm"
                fontWeight="bold"
                onClick={() => onOpen()}
            >{value.eventName}</Flex>




            {/* when the user clicks over this  */}
            <Modal
                size="xl"
                isCentered
                motionPreset='slideInBottom'
                isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    {/* Event name */}
                    <ModalHeader fontSize="4xl">{value.eventName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody fontSize="md">


                        {/* Date */}
                        <Text><span className="font-bold">Date : </span>{`${value.eventDay} ${MonthName} ${value.eventYear}`}</Text>


                        {/* Venue */}
                        <Text marginBottom="1rem"><span className="font-bold">Venue : </span>{value.eventVenue}</Text>


                        {/* Description */}
                        <Text marginBottom="1rem"><span className="font-bold">Description : </span>{value.eventDescription}</Text>


                        {/* Organized By */}
                        <Text ><span className="font-bold">Organized By : </span>{value.orgName}</Text>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='black' variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>

                        {/* Register Button */}
                        <Button variant="black" onClick={registerForEventFunction}>
                            Register
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    );
}



export default CalanderRegisterOnlyCell