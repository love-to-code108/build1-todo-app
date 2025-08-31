import { useEffect, useState } from "react";
import {NavLink, useLocation} from "react-router-dom"
import { Flex } from "@chakra-ui/react";




const NavbarHomePage = () => {



    const location = useLocation()
    const [display,setDisplay] = useState();

    useEffect(() =>{

        if(location.pathname == "/signup" || location.pathname == "/signin"){
            setDisplay(false)
        }else{
            setDisplay(true);
        }

    },[])




    return(
        <div className={`${display ? "flex" : "hidden"} bg-white w-[20%] px-[1rem]`} 
        >



            {/* navigation */}
                  <Flex width="100%" height="83.6%" backgroundColor="#f7fafc"
                   flexDirection="column" justify="start" align="center" marginTop="8rem"   >
            
            
                    {/* calander */}
                    <Flex fontSize="xl" justify="center"  align="center"  width="100%" height="3rem" 
                    
                    _hover={{ bg: '#ebedf0' }}
                    _active={{
                      bg: 'black',
                      borderColor: '#bec3c9',
                    }}
                    _focus={{
                      boxShadow:
                        '',
                    }}
            
                    cursor="pointer"
                    userSelect="none"
                    
                    ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/calander">Calander</NavLink></Flex>
            



                    {/* inbox */}
                    <Flex fontSize="xl" justify="start" align="center" padding="2px"  marginBottom="" width="100%" height="3rem" 
                    _hover={{ bg: '#ebedf0' }}
                    
                    ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/inbox">Inbox</NavLink></Flex>
            




                    {/* guest */}
                    <Flex fontSize="xl" justify="start" align="center" padding="2px"  marginBottom="" 
                     width="100%" height="3rem" 
                     _hover={{ bg: '#ebedf0' }}
                     
                     ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/guest">Guest</NavLink></Flex>
            




                    {/* vehicle status */}
                    <Flex fontSize="xl" justify="start" align="center" padding="2px"  marginBottom="" 
                    width="100%" height="3rem" 
                    _hover={{ bg: '#ebedf0' }}
                    
                    ><NavLink className=" w-[100%] h-[100%] flex justify-start items-center pl-[1rem]" to="/vehiclestatus">Vehicle Status</NavLink></Flex>
            
                  </Flex>

        </div>
    );
}


export default NavbarHomePage