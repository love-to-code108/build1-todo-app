import { Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/signUp.jsx";
import { SignIn } from "./pages/signIn.jsx";
// import Home from "./pages/home.jsx";
import Blank from "./pages/blank.jsx";
// import Home2 from "./pages/home2.jsx";
import NavbarHomePage from "./components/navbarHome.jsx";
import Calander from "./pages/calander.jsx";
import Inbox from "./pages/inbox.jsx"
import Guest from "./pages/guest.jsx"
import VehicleStatus from "./pages/vehicleStatus.jsx"
import CalanderLandingPage from "./pages/landingPage.jsx";
import { useSetRecoilState } from "recoil";
import { User } from "./Utils/atoms.js";
import { useEffect } from "react";
import api from "./Utils/axios.js";







function App() {



  const setUser = useSetRecoilState(User);


  // trying to get the user data from the backend if the jwt token exists
  useEffect(() => {

    // tyring to get user data if possible
    const jwtTokenLocalStorage = localStorage.getItem("jwtToken");


    // trying to instant sign in if there is a jwt token
    if (jwtTokenLocalStorage) {

      try {
        api.get("/instantsignin", {
          headers: {
            Authorization: `Bearer ${jwtTokenLocalStorage}`
          }
        }).then((value) => {
          setUser(value.data.user)

        })

      } catch (err) {
        console.log(err)
      }
    }

  },[])


  console.log("user");
  


  return (
    <div className=" flex w-[100%] relative">


      <NavbarHomePage />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<CalanderLandingPage />} />
        <Route path="/calander" element={<Calander />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/vehiclestatus" element={<VehicleStatus />} />
      </Routes>
    </div>
  );
}

export default App;
