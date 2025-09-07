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
import { ChevronLeft, ChevronRight, Divide } from "lucide-react"
import CalanderCells from "../components/calanderCell";
import { useEffect } from "react";
import api from "../Utils/axios";
import { currentMonthAtom, currentYearAtom, eventListAtom } from "../Utils/atoms";
import { useRecoilState } from "recoil";
import CalanderCellUniversal from "../components/calanderCellUniversal";
import { useNavigate } from "react-router-dom";









const CalanderLandingPage = () => {



    const navigate = useNavigate()

    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayofMonth = endOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const startWeekday = getDay(firstDayOfMonth);
    const endWeekDay = getDay(lastDayofMonth);


    // init the atom containing the array of all events
    const [eventList, setEventList] = useRecoilState(eventListAtom)
    const [currentMonth, setCurrentMonth] = useRecoilState(currentMonthAtom)
    const [currentYear, setCurrentYear] = useRecoilState(currentYearAtom)



    // trying instant sign in if possible
    const jwtTokenLocalStorage = localStorage.getItem("jwtToken");


    // trying to instant sign in if there is a jwt token
    if (jwtTokenLocalStorage) {

        try {
            api.get("/instantsignin", {
                headers: {
                    Authorization: `Bearer ${jwtTokenLocalStorage}`
                }
            }).then(() => {
                navigate("/calander")


            })

        } catch (err) {
            console.log(err)
        }
    }



    // asking the backend to send the array of events for this month and year that have been approved
    useEffect(() => {


        try {
            const currentMonthEventListApiCall = async () => {


                // converting the month and year to string 
                const stringMonth = (month + 1).toString()
                const stringYear = year.toString()
                setCurrentMonth(stringMonth)
                setCurrentYear(stringYear)
                let eventListResponse = []



                // sending data to get all the array of events
                try {

                    eventListResponse = await api.post("/getallapprovedevents", {

                        stringMonth,
                        stringYear,

                    })

                } catch (err) {
                    console.log(err);
                }

                setEventList(eventListResponse.data);

            }



            // calling the above function in the use effect
            currentMonthEventListApiCall();
        }
        catch (err) {
            console.log(err);
        }


    }, [month])












    // build calendar grid
    const days = [];






    // leading blanks
    for (let i = 0; i < startWeekday; i++) {

        const calanderCellObj = {
            dayNumber: null,
            monthNumber: null,
            year: null
        }


        days.push(calanderCellObj);
    }










    // days of this month
    for (let d = 1; d <= daysInMonth; d++) {

        let result = []

        try {
            // checking if this day matches with the event day
            result = eventList.filter(event => event.eventDay == d)
            console.log(result[0])

        } catch (err) {
            console.log(err)
        }

        // if we get something from searcing
        if (result != undefined) {

            console.log("working");
            const calanderCellObj = {
                dayNumber: d,
                monthNumber: month + 1,
                year: year,
                event: result,
                eventExists: true,
            }

            days.push(calanderCellObj);
        }

        // if we dont get anything from searching
        else {

            const calanderCellObj = {
                dayNumber: d,
                monthNumber: month + 1,
                year: year,
            }

            days.push(calanderCellObj);
        }



    }







    //  ending blanks
    for (let i = endWeekDay; i < 6; i++) {

        const calanderCellObj = {
            dayNumber: null,
            monthNumber: null,
            year: null
        }


        days.push(calanderCellObj);
    }













    return (

        <div className=" flex w-[100%]">



            {/* the main calander thingy */}
            <Flex width="100%" height="100vh" backgroundColor="" paddingX="2rem">


                {/* the calander */}
                <Box paddingTop="1rem" width="100%" height="100%">


                    {/* Header with navigation */}
                    <Flex align="center" justify="start" position="relative" mb="2.5rem">

                        <Flex>
                            {/* previous month */}
                            <IconButton
                                marginRight="1rem"
                                icon={<ChevronLeft />}
                                borderRadius="100%"
                                variant="outline"
                                onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                                {"<"}
                            </IconButton>

                            {/* next month */}
                            <IconButton
                                icon={<ChevronRight />}
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


                        {/* sign in button */}
                        <Button
                            variant="black"
                            position="absolute" top="0px" right="1rem"
                            onClick={() => navigate("/signin")}
                        >Sign In</Button>
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

                            return (
                                <CalanderCellUniversal key={keyIndex} keyIndex={keyIndex} value={value} />

                            )
                        })}
                    </Grid>
                </Box>
            </Flex>
        </div>
    );
}

export default CalanderLandingPage;