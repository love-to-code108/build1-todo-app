import { Button, Box, Heading, Input, Flex, Text } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useEffect } from "react";

export const SignUp = () => {

    // axios
    useEffect(() => {
        axios
        .get("http://localhost:5000/")
        .then((res) => {
            console.log("The backend is listening")
        })
        .catch((err) => {
            console.log("Backend is not listening");
        })
    })





  return (
    <div className=" w-[100%] h-[100vh] flex justify-center items-center">
      {/* the sign up box in the middle */}
      <Box border="2px" borderRadius="md" padding="12">
        {/* the Sign Up Heading */}
        <Heading fontSize="5xl" marginBottom="2.5rem">Sign Up</Heading>

        <FormControl>
          {/* the Email input */}
          <FormLabel>Email Adress</FormLabel>
          <Input marginBottom="1rem" type="email" />

          {/* the Password input */}
          <FormLabel>Password</FormLabel>
          <Input marginBottom="1rem" type="password" />

          {/* the confirm Password input */}
          <FormLabel>Confirm Password</FormLabel>
          <Input marginBottom="1rem" type="password" />
        </FormControl>

        {/* flex for the button and Sign In text */}
        <Box marginTop="1rem" w="20rem" className=" flex justify-between">
          {/* the Sign In text */}
          <Box fontSize="sm">
            <Text>Already have an account </Text>
            <Link to="/SignIn" className=" text-[#052099] font-semibold underline">Sign In</Link>
            </Box>
          {/* the Sign Up button */}
          <Button size="lg">Sign Up</Button>
        </Box>
      </Box>
    </div>
  );
};
