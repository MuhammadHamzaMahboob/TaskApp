import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom"
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="*" element={<SignIn />} />
      </Routes>
    </div>
  );
}
export default App;
