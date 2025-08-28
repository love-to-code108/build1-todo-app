import { Routes, Route, Navigate } from "react-router-dom";
import { SignUp } from "./pages/signUp.jsx";
import { SignIn } from "./pages/signIn.jsx";
import Home from "./pages/home.jsx";
import Blank from "./pages/blank.jsx";
import { useRecoilValue } from "recoil"
import { User } from "./Utils/atoms.js";






function App() {
  
  const user = useRecoilValue(User)
  

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={user == null ? <Navigate to="/signin" replace/> : <Home />} />
      </Routes>
    </div>
  );
}

export default App;
