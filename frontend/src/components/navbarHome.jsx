import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { User } from "../Utils/atoms";
import { useSetRecoilState } from "recoil";



const NavbarHomePage = () => {



    const location = useLocation()
    const [display, setDisplay] = useState();

    useEffect(() => {

        if (location.pathname == "/signup" || location.pathname == "/signin" || location.pathname == "/") {
            setDisplay(false)
        } else {
            setDisplay(true);
        }

    }, [location.pathname])


    const setUser = useSetRecoilState(User)
    const navigate = useNavigate()


    // the signout button function 
    const SignOut = () => {


        // init all things

        setUser(null)
        console.log("Pressed Log Out")
        localStorage.removeItem("jwtToken");
        navigate("/");
    }




    return (
        <div className={`${display ? "flex" : "hidden"} bg-[#151517] w-[20%] h-[100vh] px-[1rem] fixed top-[0] left-[0]`}
        >



            {/* navigation */}


            <Flex width="100%" height="83.6%"
                flexDirection="column" justify="start" align="center" marginTop="8rem" position="relative"  >


                {/* calander */}
                <Flex fontSize="xl" justify="center" align="center" width="100%" height="3rem"

                    _hover={{ bg: '#272729', textColor: "white" }}


                    cursor="pointer"
                    userSelect="none"
                    textColor="#707072"
                ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/calander"
                >Calander</NavLink></Flex>




                {/* inbox */}
                <Flex fontSize="xl" justify="start" align="center" padding="2px" marginBottom="" width="100%" height="3rem"
                    _hover={{ bg: '#272729', textColor: "white" }}
                    textColor="#707072"
                ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/inbox">Inbox</NavLink></Flex>





                {/* guest */}
                <Flex fontSize="xl" justify="start" align="center" padding="2px" marginBottom=""
                    width="100%" height="3rem"
                    _hover={{ bg: '#272729', textColor: "white" }}
                    textColor="#707072"
                ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/guest">Guest</NavLink></Flex>





                {/* vehicle status */}
                <Flex fontSize="xl" justify="start" align="center" padding="2px" marginBottom=""
                    width="100%" height="3rem"
                    _hover={{ bg: '#272729', textColor: "white" }}
                    textColor="#707072"
                ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/vehiclestatus">Vehicle Status</NavLink></Flex>





                {/* signin temporary */}
                <Flex fontSize="xl" justify="start" align="center" padding="2px" marginBottom=""
                    width="100%" height="3rem"
                    _hover={{ bg: '#272729', textColor: "white" }}
                    textColor="#707072"
                ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/signin">Sign In</NavLink></Flex>




                {/* sign out temporary */}
                <Flex fontSize="xl" justify="start" align="center" padding="2px" marginBottom=""
                    width="100%" height="3rem"
                    _hover={{ bg: '#272729', textColor: "white" }}
                    textColor="#707072"
                ><Button className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]"
                    onClick={SignOut}
                >Log Out</Button></Flex>

            </Flex>



        </div>
    );
}


export default NavbarHomePage