
import { Flex, Text } from "@chakra-ui/react";
import CalanderEvent from "./calanderEventsInCalanderCells";


const CalanderCellUniversal = ({ value, keyIndex }) => {



    return (

        <div className=" relative">
            <Flex


                flexDirection="column"
                height="100%"
                // maxHeight="8.4rem"
                // minHeight="8.3rem"
                padding="4px"
                border="1px solid #e2e8f0"
                display="flex"
                alignItems="start"
                justifyContent="start"
                bg={value.dayNumber ? "gray.50" : "transparent"}
                _hover={value.dayNumber && { bg: "#ebedf0" }}
            >

                {/* showing the day number */}
                {value.dayNumber && (
                    <Text fontSize="sm" fontWeight="medium">
                        {value.dayNumber}
                    </Text>
                )}




            </Flex>



            {/* showing events if any */}
            <div className=" overflow-y
              flex flex-col
              w-[100%] h-[] absolute cursor-pointer top-[2rem] right-0">
                {value.eventExists &&

                    value.event.map((val, ind) => {

                        console.log(val)

                        return (

                            <CalanderEvent key={ind} value={val} />

                        );
                    })

                }
            </div>
        </div>
    );
}


export default CalanderCellUniversal;