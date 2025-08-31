import { Button , Text ,Flex, useDisclosure } from "@chakra-ui/react";



const CalanderEvent = ({value}) => {

    const { isOpen , onOpen , onClose } = useDisclosure()


    const handleOnClick = () => {

        onClose();
        console.log("The Button is working")
    }


    return(
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
    );
}


export default CalanderEvent;