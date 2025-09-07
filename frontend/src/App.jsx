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







function App() {





  return (
    <div className=" flex w-[100%] relative">

      
      <NavbarHomePage />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<CalanderLandingPage/>}/>
        <Route path="/calander" element={<Calander />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/vehiclestatus" element={<VehicleStatus />} />
      </Routes>
    </div>
  );
}

export default App;
