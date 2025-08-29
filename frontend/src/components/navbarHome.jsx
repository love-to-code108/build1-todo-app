import { useEffect, useState } from "react";
import {NavLink, useLocation} from "react-router-dom"
import { Flex } from "@chakra-ui/react";



const NavbarHomePage = () => {



    const location = useLocation()
    console.log(location);
    const [display,setDisplay] = useState();

    useEffect(() =>{

        if(location.pathname == "/signup" || location.pathname == "/signin"){
            setDisplay(false)
        }else{
            setDisplay(true);
        }

    },[])





    return(
        <div className={`${display ? "flex" : "hidden"} bg-white w-[20%]`} 
        >



            {/* navigation */}
                  <Flex width="100%" height="84.5%" backgroundColor="" flexDirection="column" justify="start" align="center" marginTop="8rem"  >
            
            
                    {/* calander */}
                    <Flex fontSize="xl" justify="start" border="solid 1px #e2e8f0" align="center" padding="2px" paddingLeft="8px" marginBottom="" width="100%" height="3rem" backgroundColor="gray.50"
                    
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
                    
                    ><NavLink className=" w-[100%] h-[100%]" to="/calander">Calander</NavLink></Flex>
            



                    {/* inbox */}
                    <Flex fontSize="xl" justify="start" align="center" padding="2px" border="solid 1px #e2e8f0" paddingLeft="8px" marginBottom="" width="100%" height="3rem" backgroundColor="gray.50"
                    _hover={{ bg: '#ebedf0' }}
                    
                    ><NavLink className=" w-[100%] h-[100%]" to="/inbox">Inbox</NavLink></Flex>
            




                    {/* guest */}
                    <Flex fontSize="xl" justify="start" align="center" padding="2px" border="solid 1px #e2e8f0" marginBottom="" paddingLeft="8px"
                     width="100%" height="3rem" backgroundColor="gray.50"
                     _hover={{ bg: '#ebedf0' }}
                     
                     ><NavLink className=" w-[100%] h-[100%]" to="/guest">Guest</NavLink></Flex>
            




                    {/* vehicle status */}
                    <Flex fontSize="xl" justify="start" align="center" padding="2px" border="solid 1px #e2e8f0" marginBottom="" paddingLeft="8px"
                    width="100%" height="3rem" backgroundColor="gray.50"
                    _hover={{ bg: '#ebedf0' }}
                    
                    ><NavLink className=" w-[100%] h-[100%]" to="/vehiclestatus">Vehicle Status</NavLink></Flex>
            
                  </Flex>

        </div>
    );
}


export default NavbarHomePage