import { Button, Box, Heading, Input, Flex, Text } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import api from "../Utils/axios";






export const SignUp = () => {

    // useState to collect data from the inputs:
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const[checkPass, setCheckPass] = useState();


    // Configuring the toast
    const toast = useToast()



    // when the sign up button is pressed
    const signUpFunction = async() => {

        if(password !== checkPass){
            toast({
                title: "Passwords dont match",
                description: "The password you provided does not match with the password in the confirm password section",
                status:"error",
                duration:9000,
                isClosable:true,
                position:"top-right"
            })

            return;
        }


        // sending data to the backend
        try{
            const signUpRes = await api.post("/signup",{
                email,
                password
            });
            if(signUpRes.data == 200){
              toast({
                title: "Account Created",
                description: "Your account has been created sucessfully",
                status:"success",
                duration:9000,
                isClosable:true,
                position:"top-right"
            })
            }

            else if (signUpRes.data == "Email Already Exists"){
              toast({
                title: "Email Already Exist",
                description: "There is already and existing account with this email please try to Sign In",
                status:"error",
                duration:9000,
                isClosable:true,
                position:"top-right"
            })
            }


        }catch(err){
            console.log(err)
        }

    }









  return (
    <div className=" w-[100%] h-[100vh] flex justify-center items-center">
      {/* the sign up box in the middle */}
      <Box border="2px" borderRadius="md" padding="12">
        {/* the Sign Up Heading */}
        <Heading fontSize="5xl" marginBottom="2.5rem">Sign Up</Heading>

        <FormControl>


          {/* the Email input */}
          <FormLabel>Email Address</FormLabel>
          <Input id="SignUpEmail"
          onChange={(e) => {setEmail(e.target.value)}}
           marginBottom="1rem" type="email" placeholder="Email"/>



          {/* the Password input */}
          <FormLabel>Password</FormLabel>
          <Input id="SignUpPassword"
          onChange={(e) => {setPassword(e.target.value)}}
           marginBottom="1rem" type="password" placeholder="Passowrd"/>



          {/* the confirm Password input */}
          <FormLabel>Confirm Password</FormLabel>
          <Input id="SignUpCheckPassword"
          onChange={(e) => {setCheckPass(e.target.value)}}
           marginBottom="1rem" type="password" placeholder="Password"/>
        </FormControl>



        {/* flex for the button and Sign In text */}
        <Box marginTop="1rem" w="20rem" className=" flex justify-between">
          {/* the Sign In text */}
          <Box fontSize="sm">
            <Text>Already have an account </Text>
            <Link to="/SignIn" className=" text-[#3182ce] font-semibold underline">Sign In</Link>
            </Box>


          {/* the Sign Up button */}
          <Button onClick={signUpFunction} size="lg">Sign Up</Button>
        </Box>
      </Box>
    </div>
  );
};
