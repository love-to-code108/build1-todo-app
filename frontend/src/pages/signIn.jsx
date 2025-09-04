import { Button, Box, Heading, Input, Flex, Text } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios"
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import api from "../Utils/axios";
import { useSetRecoilState } from "recoil";
import { User } from "../Utils/atoms";






export const SignIn = () => {

  const setUser = useSetRecoilState(User);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const toast = useToast();

  const navigate = useNavigate();





  const signInFunction = async () => {

    // sending data to the backend
    try {

      const signInResponse = await api.post("/signin", {
        email,
        password
      })

      console.log(signInResponse);

      // responding as per the data we got back
      if (signInResponse.data.message === "User not found") {
        toast({
          title: "User not found",
          description: "There is no existing account with this email",
          status: "error",
          isClosable: "true",
          position: "top-right"
        })

        return;
      }



      if (signInResponse.data.message === "Invalid Credentials") {
        toast({
          title: "Invalid Credentials",
          description: "Please recheck your email and password",
          status: "error",
          isClosable: "true",
          position: "top-right"
        })

        return;
      }


      // sigin sucessful
      toast({
        title: "Login Successful",
        description: "You have successfully logged in ",
        status: "success",
        isClosable: "true",
        position: "top-right",
        duration: 1000
      })



      // navigating to the home page
      console.log(signInResponse.data.user)
      const setUser = signInResponse.data.user;

      localStorage.setItem("jwtToken", signInResponse.data.jwtToken);

      // redirecting to /calander if sign in sucessful
      navigate("/calander", { replace: true });



    } catch (err) {
      console.log(err);
    }


  }






  // if there is an already existing jwt token sending it so that the user is instantly signed in without any hastle
  const jwt = async () => {

    try {

      // getting the jwt token from the local storage
      const jwtToken = localStorage.getItem("jwtToken");
      
    }

    catch (err) {
      console.log(err.response.data);
    }

  }

  jwt()







  return (
    <div className=" w-[100%] h-[100vh] flex justify-center items-center">
      {/* the sign up box in the middle */}
      <Box border="2px" borderColor="#A4A3A3" borderRadius="md" padding="12">
        {/* the Sign Up Heading */}
        <Heading fontSize="5xl" marginBottom="2.5rem">Sign In</Heading>

        <FormControl>


          {/* the Email input */}
          <FormLabel>Email Address</FormLabel>
          <Input id="SignUpEmail"
            onChange={(e) => { setEmail(e.target.value) }}
            marginBottom="1rem" type="email" placeholder="Email" />



          {/* the Password input */}
          <FormLabel>Password</FormLabel>
          <Input id="SignUpPassword"
            onChange={(e) => { setPassword(e.target.value) }}
            marginBottom="1rem" type="password" placeholder="Password" />


        </FormControl>



        {/* flex for the button and Sign In text */}
        <Box marginTop="1rem" w="20rem" className=" flex justify-between">
          {/* the Sign In text */}
          <Box fontSize="sm">
            <Text>Don't have an account </Text>
            <Link to="/signup" className=" text-[#3182ce] font-semibold underline">Sign Up</Link>
          </Box>


          {/* the Sign In button */}
          <Button
            _hover={{ bg: '#2D2D2D', color: "white" }}
            borderRadius="4px" size="lg"
            onClick={signInFunction}
          >Sign In</Button>
        </Box>
      </Box>
    </div>
  );
};
