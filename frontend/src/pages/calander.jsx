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
import CalanderCells from "../components/calanderCell";
import { useEffect } from "react";
import api from "../Utils/axios";
import { currentMonthAtom, currentYearAtom, eventListAtom } from "../Utils/atoms";
import { useRecoilState } from "recoil";









const Calander = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayofMonth = endOfMonth(currentDate);
  const daysInMonth = getDaysInMonth(currentDate);
  const startWeekday = getDay(firstDayOfMonth);
  const endWeekDay = getDay(lastDayofMonth); 


  // init the atom containing the array of all events
  const[eventList,setEventList] = useRecoilState(eventListAtom)
  const[currentMonth,setCurrentMonth] = useRecoilState(currentMonthAtom)
  const[currentYear,setCurrentYear] = useRecoilState(currentYearAtom)








  // asking the backend to send the array of events for this month and year
  useEffect(() => {

    const currentMonthEventListApiCall = async() => {

     
      // converting the month and year to string 
      const stringMonth = (month + 1).toString()
      const stringYear = year.toString()
      setCurrentMonth(stringMonth)
      setCurrentYear(stringYear)
      let eventListResponse = []



      // sending data to get all the array of events
      try{
        
          eventListResponse =   await api.post("/getallevents" , {

          stringMonth,
          stringYear,

        })

      }catch(err){
        console.log(err);
      }

      setEventList(eventListResponse.data);

    }



    // calling the above function in the use effect
    currentMonthEventListApiCall();


  },[month])












  // build calendar grid
  const days = [];

  




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
    


    // checking if this day matches with the event day
    const result = eventList.find(event => event.eventDay == d)    

    // if we get something from searcing
    if(result){
      const calanderCellObj = {
      dayNumber:d,
      monthNumber:month + 1,
      year:year,
      event:result,
    }

    days.push(calanderCellObj);
  }
    
    // if we dont get anything from searching
    else{
      
      const calanderCellObj = {
      dayNumber:d,
      monthNumber:month + 1,
      year:year,
    }

    days.push(calanderCellObj);
  }
    


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
          
            return(
          <CalanderCells key={keyIndex} keyIndex={keyIndex} value={value}/>

          )})}
      </Grid>
    </Box>
    </Flex>
  );
}

export default Calander;