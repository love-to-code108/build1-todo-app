import { useState } from "react";
import { Box, Grid, Text, Button, Flex, IconButton } from "@chakra-ui/react";
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
    <Flex width="100vw" height="100vh" backgroundColor="">
      <Flex width="20%">

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
