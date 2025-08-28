import {useNavigate} from "react-router-dom"
import { useRecoilValue } from "recoil";
import { User } from "./atoms";

function ProtectedRoute({children}){

    const navigate = useNavigate()

    const user = useRecoilValue(User)
   

    // check if there is anything inside the user atom
    if(user === null){
        
       navigate("/signin",{replace:true});
       return;
    }


    return (children);

}

export default ProtectedRoute;