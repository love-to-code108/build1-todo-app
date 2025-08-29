import { Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/signUp.jsx";
import { SignIn } from "./pages/signIn.jsx";
// import Home from "./pages/home.jsx";
import Blank from "./pages/blank.jsx";
import Home2 from "./pages/home2.jsx";






function App() {
  


  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home2/>}/>
      </Routes>
    </div>
  );
}

export default App;
