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
    Text,
    Flex,
    UnorderedList,
    ListItem
} from '@chakra-ui/react'




import { Button } from '@chakra-ui/react';
import { useRef } from 'react';
import api from '../Utils/axios';
import { useRecoilState } from 'recoil';
import { organizationListAtom } from '../Utils/atoms';
import { useEffect } from 'react';



const AddOrganization = () => {

    // init
    const { isOpen, onOpen, onClose } = useDisclosure()
    const organizationName = useRef("")
    const toast = useToast()
    const [organizationList, setOrganizationList] = useRecoilState(organizationListAtom)

    useEffect(() => {

        // getting the organization array list
        const gettingOrganizationListFromBackend = async () => {

            // sending the backend a request to fetch the list of all organization
            const organizationListRes = await api.get("/organizationlist")
            console.log(organizationListRes.data.organizationlist);
            setOrganizationList(organizationListRes.data.organizationlist)
        }


        gettingOrganizationListFromBackend()

    }, [])


    // adding organization name to the backend
    const addOrganizationName = async () => {


        // only send it to the backend if its not null
        if (organizationName.current.value) {

            try {

                const addOrganizationNameRes = await api.post("/addorganization", {
                    organizationName: organizationName.current.value
                })

                // updating the organization list
                setOrganizationList(addOrganizationNameRes.data.organizationList)


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

                    <Flex flexDirection="column" w="100%" p="1.4rem">

                        <Flex w="100%" justify="end">
                            <Button
                                onClick={addOrganizationName}
                                variant='black'>Add</Button>
                        </Flex>



                        {/* showing list of all organizations */}
                        <UnorderedList>

                            {
                                organizationList &&
                                // showing all the existing organizations
                                organizationList.map((value, key) => {
                                    return (
                                        <ListItem key={key}>{value.organizationName}</ListItem>
                                    )
                                })
                            }
                        </UnorderedList>





                        <Text></Text>
                    </Flex>
                </ModalContent>
            </Modal>
        </div>
    );
}


export default AddOrganization;