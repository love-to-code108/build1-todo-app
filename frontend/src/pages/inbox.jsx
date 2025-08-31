import { unApprovedEventListAtom } from "../Utils/atoms";
import { useRecoilState } from "recoil";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import api from "../Utils/axios";




const Inbox = () => {
  // getting the list of unapproved events from recoil
  const [unApprovedEventList, setUnApprovedEventList] = useRecoilState(
    unApprovedEventListAtom
  );




  useEffect(() => {
    // getting the list of unapproved events after inbox button is clicked
    const unApprovedEventListFunction = async () => {
      // now the list is acessable from anywhere in the app
      const list = await api.get("/inbox");
      setUnApprovedEventList(list.data);
    };

    unApprovedEventListFunction();
  }, []);



  // toast
  const toast = useToast();




  return (
    <div className=" w-[100%] p-[2rem]">
      <Flex flexDirection="column">
        {/* the inbox heading */}
        <Text fontSize="3xl" fontWeight="bold" marginBottom="2rem">
          Inbox
        </Text>






        {/* all the mails pending for approval */}
        {unApprovedEventList &&
          unApprovedEventList.map((value, index) => {





            // updating the approved state
            const approveFunction = async () => {
              const _id = value._id;
              const approved = true;

              try {
                const approveEventResponse = await api.post("/eventapprove", {
                  _id,
                  approved,
                });

                toast({
                  title: "Event Approved",
                  description: "The event has been successfully approved and is now visible to participants.",
                  status: "success",
                  isClosable: "true",
                  position: "top-right",
                  duration: 4000,
                });
                
              } catch (err) {
                console.log(err);
              }


            //   reupdating the list
                const list = await api.get("/inbox");
                setUnApprovedEventList(list.data);

              
            };




            return (
              <Flex
                width="100%"
                backgroundColor="#F0F0F0"
                marginBottom="2rem"
                padding="2rem"
                flexDirection="column"
                key={index}
              >
                {/* event name */}
                <Text>{value.eventName}</Text>

                {/*date */}
                <Text>
                  {value.eventDay +
                    "/" +
                    value.eventMonth +
                    "/" +
                    value.eventYear}
                </Text>

                {/* venue */}
                <Text>
                  <span>Venue : </span>
                  {value.eventVenue}
                </Text>

                {/* description */}
                <Text>{value.eventDescription}</Text>

                {/* organizer */}
                <Text>{value.orgName}</Text>

                {/* approve and decline buttons */}
                <Flex
                  width="100%"
                  justify="end"
                  marginBottom="0rem"
                  backgroundColor=""
                >
                  {/* Decline Button */}
                  <Button variant="outline" colorScheme="black">
                    Decline
                  </Button>

                  {/* Approve Button */}
                  <Button
                    marginLeft="2rem"
                    backgroundColor="black"
                    colorScheme="black"
                    onClick={approveFunction}
                  >
                    Approve
                  </Button>
                </Flex>
              </Flex>
            );
          })}
      </Flex>
    </div>
  );
};

export default Inbox;
