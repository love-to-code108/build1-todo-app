import { useState } from "react";
import { Box, Grid, Text, Button, Flex } from "@chakra-ui/react";
import {
  startOfMonth,
  getDaysInMonth,
  getDay,
  format,
  addMonths,
  subMonths,
  endOfMonth,
} from "date-fns";

function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
//   console.log(currentDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayofMonth = endOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startWeekday = getDay(firstDayOfMonth);
  const endweekDay = getDay(lastDayofMonth); 
  console.log(endweekDay)

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
    for(let i = endweekDay; i<6 ; i++ ){
        days.push(null);
    }




  return (
    <Box p={4}>
      {/* Header with navigation */}
      <Flex justify="space-between" align="center" mb={4}>
        <Button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          Prev
        </Button>
        <Text fontSize="xl" fontWeight="bold">
          {format(currentDate, "MMMM yyyy")}
        </Text>
        <Button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          Next
        </Button>
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
      <Grid templateColumns="repeat(7, 1fr)" gap={1}>
        {days.map((day, idx) => {
            
            console.log(idx)
            
            return(
          <Box
            key={idx}
            h="6rem"
            padding="4px"
            border="1px solid #e2e8f0"
            borderRadius="3px"
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
  );
}

export default Home;
