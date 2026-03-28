import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/index.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignupChoice from "./pages/SignupChoice";

// Keep the actual patient/doctor signup forms commented out until Step 3!
import SignupPatient from "./pages/SignupPatient";
import SignupDoctor from "./pages/SignupDoctor";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignupChoice />} />
          <Route path="signup/patient" element={<SignupPatient />} /> 
          <Route path="signup/doctor" element={<SignupDoctor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;