import { monthNameArrayAtom, unApprovedEventListAtom } from "../Utils/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import api from "../Utils/axios";




const Inbox = () => {
  // getting the list of unapproved events from recoil
  const [unApprovedEventList, setUnApprovedEventList] = useRecoilState(
    unApprovedEventListAtom
  );



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



  // toast
  const toast = useToast();




  return (
    <div className=" w-[100%] flex ">

      <Flex 
      width="20%"
      ></Flex>

      <Flex 
      width="80%"
      flexDirection="column"
      align="center"
      
      padding="2rem">
        {/* the inbox heading */}
        <Text fontSize="3xl" fontWeight="bold" marginBottom="3rem" textAlign="left" width="90%">
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


            }

            console.log(value.eventMonth)
            const MonthName = monthNameArray[value.eventMonth]





            // returning the array of unapproved events
            return (
              
              <Flex
                width="90%"
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
