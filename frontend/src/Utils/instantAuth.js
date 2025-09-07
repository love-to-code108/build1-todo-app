import api from "./axios";
import User from "../../../backend/DB/userSchema";
import { useSetRecoilState } from "recoil";


const useInstantAuth = () => {

    const setUser = useSetRecoilState(User);
    const localJwtToken = localStorage.getItem("jwtToken");

    try {
        const instantSigninRes = api.get("/instantsignin", {
            headers: {
                authorization: `Bearer ${localJwtToken}`
            }
        })

        console.log(instantSigninRes.data)
        setUser(instantSigninRes.data.user)


    }catch(err){
        console.log(err);
    }
}

export default useInstantAuth;