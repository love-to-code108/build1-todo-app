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
import CalanderCells from "./calanderCell";

const Calander = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
//   console.log(currentDate);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  console.log(month);

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayofMonth = endOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startWeekday = getDay(firstDayOfMonth);
  const endWeekDay = getDay(lastDayofMonth); 
  // console.log(endWeekDay)

  // build calendar grid
  const days = [];

  // calander cell object
  const calanderCellObj = {
    dayNumber:null,
    monthNumber:null,
    year:null
  }


    //  console.log(days);



    // leading blanks
  for (let i = 0; i < startWeekday; i++) {

    const calanderCellObj = {
    dayNumber:null,
    monthNumber:null,
    year:null
  }
    

    days.push(calanderCellObj);
  }



    // days of this month
  for (let d = 1; d <= daysInMonth; d++) {
    
    const calanderCellObj = {
    dayNumber:d,
    monthNumber:month + 1,
    year:year + 1,
  }
    

    days.push(calanderCellObj);

  }



    //  ending blanks
    for(let i = endWeekDay; i<6 ; i++ ){

    const calanderCellObj = {
    dayNumber:null,
    monthNumber:null,
    year:null
  }
    
    
    days.push(calanderCellObj);
    }




  return (
    <Flex width="100%" height="100%" backgroundColor="" paddingLeft="">


      {/* the calander */}
    <Box paddingTop="1rem" width="100%" height="100%">
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
      <Grid templateColumns="repeat(7, 1fr)" height="85%" >
        {days.map((value, keyIndex) => {  
          
          // console.log(value)
            return(
          <CalanderCells key={keyIndex} keyIndex={keyIndex} value={value}/>

          )})}
      </Grid>
    </Box>
    </Flex>
  );
}

export default Calander;