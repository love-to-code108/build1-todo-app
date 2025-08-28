import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Blank = () => {


    const navigate = useNavigate()

    useEffect(() => {
        navigate("/signin" , {replace : true})
    })

    return(
        <div></div>
    );
        
    
}

export default Blank