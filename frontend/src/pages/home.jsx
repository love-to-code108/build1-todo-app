import { useState } from "react";
import { Box, Grid, Text, Button, Flex, IconButton, Center } from "@chakra-ui/react";
import {
  startOfMonth,
  getDaysInMonth,
  getDay,
  format,
  addMonths,
  subMonths,
  endOfMonth,
} from "date-fns";
import {ChevronLeft, ChevronRight} from "lucide-react"

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
//   console.log(currentDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayofMonth = endOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startWeekday = getDay(firstDayOfMonth);
  const endWeekDay = getDay(lastDayofMonth); 
  console.log(endWeekDay)

  // build calendar grid
  const days = [];

    // leading blanks
  for (let i = 0; i < startWeekday; i++) {
    days.push(null);
  }

    // days of this month
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

    //  ending blanks
    for(let i = endWeekDay; i<6 ; i++ ){
        days.push(null);
    }




  return (
    <Flex width="100vw" height="100vh" backgroundColor="" paddingLeft="1rem">


      {/* navigation */}
      <Flex width="20%" height="84.5%" backgroundColor="" flexDirection="column" justify="start" align="center" marginTop="8rem"  >


        {/* calander */}
        <Flex fontSize="xl" justify="start" border="solid 1px #e2e8f0" align="center" padding="2px" paddingLeft="8px" marginBottom="" width="100%" height="3rem" backgroundColor="gray.50"
        
        _hover={{ bg: '#ebedf0' }}
        _active={{
          bg: 'black',
          borderColor: '#bec3c9',
        }}
        _focus={{
          boxShadow:
            '',
        }}

        cursor="pointer"
        userSelect="none"

        onClick={{backgroundColor : "black"}}
        
        >Calander</Flex>

        {/* inbox */}
        <Flex fontSize="xl" justify="start" align="center" padding="2px" border="solid 1px #e2e8f0" paddingLeft="8px" marginBottom="" width="100%" height="3rem" backgroundColor="gray.50"
        _hover={{ bg: '#ebedf0' }}
        
        >Inbox</Flex>

        {/* guest */}
        <Flex fontSize="xl" justify="start" align="center" padding="2px" border="solid 1px #e2e8f0" marginBottom="" paddingLeft="8px"
         width="100%" height="3rem" backgroundColor="gray.50"
         _hover={{ bg: '#ebedf0' }}
         
         >Guest</Flex>

        {/* vehicle status */}
        <Flex fontSize="xl" justify="start" align="center" padding="2px" border="solid 1px #e2e8f0" marginBottom="" paddingLeft="8px"
        width="100%" height="3rem" backgroundColor="gray.50"
        _hover={{ bg: '#ebedf0' }}
        
        >Vehicle Status</Flex>

      </Flex>








      {/* the calander */}
    <Box p={4} width="80%" height="100%">
      {/* Header with navigation */}
      <Flex align="center" mb="2.5rem">

        <Flex>
        {/* previous month */}
        <IconButton 
        marginRight="1rem"
        icon={<ChevronLeft/>}
        borderRadius="100%"
        variant="outline"
        onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          {"<"}
        </IconButton>

        {/* next month */}
        <IconButton 
        icon={<ChevronRight/>}
        marginRight="1rem"
        variant="outline"
        borderRadius="100%"
        onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          {">"}
        </IconButton>
        </Flex>

        {/* the month and year */}
        <Text fontSize="xl" fontWeight="bold">
          {format(currentDate, "MMMM yyyy")}
        </Text>
      </Flex>

      {/* Weekday labels */}
      <Grid templateColumns="repeat(7, 1fr)" gap={2} mb={2}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text key={day} fontWeight="bold" textAlign="center">
            {day}
          </Text>
        ))}
      </Grid>

      {/* Calendar days */}
      <Grid templateColumns="repeat(7, 1fr)" >
        {days.map((day, idx) => {
            
            console.log(idx)
            
            return(
          <Box
            key={idx}
            h="8.5rem"
            padding="4px"
            border="1px solid #e2e8f0"
            
            display="flex"
            alignItems="start"
            justifyContent="start"
            bg={day ? "gray.50" : "transparent"}
            _hover={day && { bg: '#ebedf0' }}
          >
            {day && (
              <Text fontSize="sm" fontWeight="medium">
                {day}
              </Text>
            )}
          </Box>


        )})}
      </Grid>
    </Box>
    </Flex>
  );
}

export default Home;
