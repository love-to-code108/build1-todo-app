import { monthNameArrayAtom, unApprovedEventListAtom } from "../Utils/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import api from "../Utils/axios";
import useInstantAuth from "../Utils/useInstantAuth";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'




const Inbox = () => {


  // instant user auth
  useInstantAuth("/inbox");
  // toast
  const toast = useToast();
  // getting the list of unapproved events from recoil
  const [unApprovedEventList, setUnApprovedEventList] = useRecoilState(
    unApprovedEventListAtom
  );
  const { isOpen, onOpen, onClose } = useDisclosure();










  // getting the month names
  const monthNameArray = useRecoilValue(monthNameArrayAtom)





  useEffect(() => {
    // getting the list of unapproved events after inbox button is clicked
    const unApprovedEventListFunction = async () => {
      // now the list is acessable from anywhere in the app
      const list = await api.get("/inbox");
      setUnApprovedEventList(list.data);
    };

    unApprovedEventListFunction();
  }, []);







  return (
    <div className=" w-[100%] flex ">

      <Flex
        width="20%"
      ></Flex>

      <Flex
        width="80%"
        flexDirection="column"
        align="center"

        padding="1rem">
        {/* the inbox heading */}
        <Text fontSize="3xl" fontWeight="bold" marginBottom="3rem" textAlign="left" width="95%">
          Inbox
        </Text>






        {/* all the mails pending for approval */}
        {unApprovedEventList &&
          unApprovedEventList.map((value, index) => {





            // if the event is approved or unapproved
            const approveUnapproveFunction = async (approved) => {
              const _id = value._id;

              onClose();

              try {
                const approveEventResponse = await api.post("/eventapprove", {
                  _id,
                  approved,
                });



                // if delete successful
                if (approveEventResponse.data.status == "error") {

                  toast(
                    approveEventResponse.data
                  )
                }

                // if event is approved
                else if (approveEventResponse.data.status == "success") {
                  toast({
                    title: "Event Approved",
                    description: "The event has been successfully approved and is now visible to participants.",
                    status: "success",
                    isClosable: "true",
                    position: "top-right",
                    duration: 4000,
                  });
                }




              } catch (err) {
                console.log(err);
              }


              //   reupdating the list
              const list = await api.get("/inbox");
              setUnApprovedEventList(list.data);


            }




            // getting the month names
            const MonthName = monthNameArray[value.eventMonth]





            // returning the array of unapproved events
            return (

              <Flex
                width="95%"
                backgroundColor="#F0F0F0"
                marginBottom="2rem"
                padding="2rem"
                flexDirection="column"
                key={index}
                borderRadius={6}
              >



                {/* event name */}
                <Text fontSize="3xl" fontWeight="bold" marginBottom="1.5rem">{value.eventName}</Text>

                {/* Date */}
                <Text><span className="font-bold">Date : </span>{`${value.eventDay} ${MonthName} ${value.eventYear}`}</Text>


                {/* Venue */}
                <Text marginBottom="1rem"><span className="font-bold">Venue : </span>{value.eventVenue}</Text>


                {/* Description */}
                <Text marginBottom="1rem"><span className="font-bold">Description : </span>{value.eventDescription}</Text>


                {/* Organized By */}
                <Text ><span className="font-bold">Organized By : </span>{value.orgName}</Text>



                {/* approve and decline buttons */}
                <Flex
                  width="100%"
                  justify="end"
                  marginBottom="0rem"
                  backgroundColor=""
                >
                  {/* Decline Button */}
                  <Button
                    onClick={onOpen}
                    variant="outline" colorScheme="black">
                    Decline
                  </Button>

                  {/* Approve Button */}
                  <Button
                    marginLeft="2rem"
                    backgroundColor="black"
                    colorScheme="black"
                    onClick={() => approveUnapproveFunction(true)}
                  >
                    Approve
                  </Button>



                  {/* the modal for decline */}
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader fontSize="2xl">Delete Event</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                       <Text>Are you sure you want to delete this event</Text>
                      </ModalBody>

                      <ModalFooter>
                        <Button 
                        onClick={() => approveUnapproveFunction(null)}
                        colorScheme='red'>Delete</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>



                </Flex>
              </Flex>
            );
          })}
      </Flex>
    </div>
  );
};

export default Inbox;
