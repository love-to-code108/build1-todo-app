import { Routes,Route } from "react-router-dom"
import { SignUp } from "./pages/signUp.jsx"
import { SignIn } from "./pages/signIn.jsx"


function App() {

  return (
    <div>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
    </Routes>
    </div>
  )
}

export default App
