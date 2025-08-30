import { Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/signUp.jsx";
import { SignIn } from "./pages/signIn.jsx";
// import Home from "./pages/home.jsx";
import Blank from "./pages/blank.jsx";
import Home2 from "./pages/home2.jsx";
import NavbarHomePage from "./components/navbarHome.jsx";
import Calander from "./components/calander.jsx";
import Inbox from "./components/inbox.jsx"
import Guest from "./components/guest.jsx"
import VehicleStatus from "./components/vehicleStatus.jsx"







function App() {





  return (
    <div className=" flex w-[100vw] h-[100vh]">

      
      <NavbarHomePage />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/calander" element={<Calander />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/vehiclestatus" element={<VehicleStatus />} />
      </Routes>
    </div>
  );
}

export default App;
