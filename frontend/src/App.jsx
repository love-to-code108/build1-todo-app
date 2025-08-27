import { Routes,Route } from "react-router-dom"
import { SignUp } from "./pages/signUp.jsx"
import { SignIn } from "./pages/signIn.jsx"
import Home from "./pages/home.jsx"


function App() {

  return (
    <div>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    </div>
  )
}

export default App
