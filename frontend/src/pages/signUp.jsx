import { Button, Box, Heading, Input, Flex, Text, Select } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
import api from "../Utils/axios";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { organizationListAtom } from "../Utils/atoms";
import { useRef } from "react";






export const SignUp = () => {

    // useState to collect data from the inputs:
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const organizationName = useRef("");
    const[checkPass, setCheckPass] = useState();
    const toast = useToast()
    const navigate = useNavigate();
    const [organizationList , setOrganizationList] = useRecoilState(organizationListAtom)



    // getting the list of organizations
    useEffect(() => {

        // getting the organization array list
        const gettingOrganizationListFromBackend = async () => {

            // sending the backend a request to fetch the list of all organization
            const organizationListRes = await api.get("/organizationlist")
            console.log(organizationListRes.data.organizationlist);
            setOrganizationList(organizationListRes.data.organizationlist)
        }


        gettingOrganizationListFromBackend()

    }, [])


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



        if(!organizationName){
            toast({
                title: "Organization Name not selected",
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
                password,
                organization : organizationName.current.value
            });


            // updating response based on the backends reply
            if(signUpRes.data == "New user created"){
              toast({
                title: "Account Created",
                description: "Your account has been created sucessfully",
                status:"success",
                duration:9000,
                isClosable:true,
                position:"top-right"
            })

            navigate("/signin")


            }


            // updating response based on the backends reply
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
      <Box boxShadow="2xl" borderRadius="md" padding="12">
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




           {/* select organization */}
           <FormLabel>Select Organization</FormLabel>
           <Select ref={organizationName} variant="filled">
              {
                organizationList &&

                organizationList.map((value, key) => {

                  return(
                    <option key={key}>{value.organizationName}</option>
                  )

                })
              }
           </Select>
        </FormControl>


        {/* already have an account sign in part */}
        {/* flex for the button and Sign In text */}
        <Box marginTop="1rem" w="20rem" className=" flex justify-between">
          {/* the Sign In text */}
          <Box fontSize="sm">
            <Text> </Text>
            <Link to="/signin" className=" text-[#3182ce] font-semibold underline"></Link>
            </Box>


          {/* the Sign Up button */}
          <Button
          variant="black"
            borderRadius="4px" onClick={signUpFunction} size="lg">Sign Up</Button>
        </Box>
      </Box>
    </div>
  );
};
