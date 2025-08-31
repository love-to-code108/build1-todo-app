import { unApprovedEventListAtom } from "../Utils/atoms";
import { useRecoilState } from "recoil";
import { Flex , Text } from "@chakra-ui/react";
import { useEffect } from "react";
import api from "../Utils/axios";


const Inbox = () => {



    // getting the list of unapproved events from recoil
    const [unApprovedEventList , setUnApprovedEventList] = useRecoilState(unApprovedEventListAtom);
    console.log(unApprovedEventList);



    useEffect(() => {
        // getting the list of unapproved events after inbox button is clicked
    const unApprovedEventListFunction = async() => {


        // now the list is acessable from anywhere in the app
        const list = await api.get("/inbox")
        setUnApprovedEventList(list.data);
    }

    unApprovedEventListFunction();
    },[])


     




    return(
        <div> 
            
            <Flex flexDirection="column">
            
            {/* the inbox heading */}
            <Text fontSize="3xl">Inbox</Text>


            {/* all the mails pending for approval */}
            { unApprovedEventList  && unApprovedEventList.map((value , index) => {


                return(
                    <Flex
                    backgroundColor="red.300"
                    marginBottom="2rem"
                    
                    flexDirection="column" key={index}>
                        {/* event name */}
                        <Text>{value.eventName}</Text>

                        {/*date */}
                        <Text>{value.eventName}</Text>

                        {/* venue */}
                        <Text>
                            <span>Venue :</span>
                             {value.eventVenue}
                        </Text>

                        {/* description */}
                        <Text>
                            {value.eventDescription}
                        </Text>

                        {/* organizer */}
                        <Text>
                            {value.orgName}
                        </Text>



                    </Flex>
                );
            })}



            </Flex>

        </div>
    );
}



export default Inbox;