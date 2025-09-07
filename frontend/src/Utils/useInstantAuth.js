import api from "./axios";
import { useRecoilState } from "recoil";
import { User } from "./atoms"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useInstantAuth = (navigateTo) => {


    const [user, setUser] = useRecoilState(User);
    const navigate = useNavigate()

    useEffect(() => {


        // checking if there is anything inside user 
        if (!user) {


            // if there is nothing inside user we fetch the jwt token and send it to the backend to get user
            const localJwtToken = localStorage.getItem("jwtToken");

            if (localJwtToken) {
                try {
                    api.get("/instantsignin", {
                        headers: {
                            authorization: `Bearer ${localJwtToken}`
                        }
                    }).then((value) => {


                        setUser(value.data.user);
                        if (value.data.user) {
                            navigate(navigateTo, { replace: true })
                        }
                        else {
                            navigate("/signin", { replace: true })
                        }

                    })







                } catch (err) {
                    console.log(err);
                }
            }

            else {
                console.log("me working")
                navigate("/signin", { replace: true })
            }
        }

        // if there is a user then there is no need to send anything to the backend we will simply return a true
        else {
            navigate(navigateTo, { replace: true })
        }


    }, [])




}

export default useInstantAuth;

