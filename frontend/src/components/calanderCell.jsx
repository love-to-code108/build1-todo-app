import { Box , Text } from "@chakra-ui/react";

const CalanderCells = ({value , keyIndex}) => {


    const whenClicking = () => {


        console.log(value);
    }






  return (
    <Box
      
      onClick={whenClicking}



      h=""
      padding="4px"
      border="1px solid #e2e8f0"
      display="flex"
      alignItems="start"
      justifyContent="start"
      bg={value.dayNumber ? "gray.50" : "transparent"}
      _hover={value.dayNumber && { bg: "#ebedf0" }}
    >
      {value.dayNumber && (
        <Text fontSize="sm" fontWeight="medium">
          {value.dayNumber}
        </Text>
      )}
    </Box>
  );
};

export default CalanderCells;
