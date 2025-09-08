import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Text
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import { useRef } from 'react';
import api from '../Utils/axios';



const AddOrganization = () => {

    // init
    const { isOpen, onOpen, onClose } = useDisclosure()
    const organizationName = useRef("")
    const toast = useToast()

    // adding organization name to the backend
    const addOrganizationName = async () => {


        // only send it to the backend if its not null
        if (organizationName.current.value) {

            try {

                const addOrganizationNameRes = await api.post("/addorganization", {
                    organizationName: organizationName.current.value
                })

                
                // on sucessfully adding organization
                toast({
                    title: "Sucessfully added new organization",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right"
                })

            } catch (err) {

                // on error
                toast({
                    title: "Organization name already taken",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top-right"
                })
            }

        }


        // if the user didnot enter any value
        else {

            // on error
            toast({
                title: "Enter a name for the new organization",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top-right"
            })
        }

    }







    return (
        <div className=' w-[100%]'>
            <Button onClick={onOpen} width="100%" >Add Clubs</Button>


            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Organizations</ModalHeader>
                    <ModalCloseButton />


                    <ModalBody>


                        {/* taking the name of the organization as input */}
                        <FormControl>
                            <FormLabel>Enter organization name</FormLabel>
                            <Input
                                ref={organizationName}
                                type='text' placeholder='Name' />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={addOrganizationName}
                            variant='black'>Add</Button>


                        {/* showing list of all organizations */}
                        <Text></Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}


export default AddOrganization;