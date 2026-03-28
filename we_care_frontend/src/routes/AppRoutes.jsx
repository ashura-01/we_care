import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import Symptoms from "../pages/Symptoms";
import Hospitals from "../pages/Hospitals";

import LoginRoutes from "./LoginRoutes";
import AdminRoutes from "./AdminRoutes";

// 1. Import your new signup pages
import SignupChoice from "../pages/SignupChoice";
import PatientSignup from "../pages/PatientSignup";
import DoctorSignup from "../pages/DoctorSignup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/symptoms" element={<Symptoms />} />
      <Route path="/hospitals" element={<Hospitals />} />

      <Route path="/login/*" element={<LoginRoutes />} />
      
      {/* 2. Add the new Signup Routes right here */}
      <Route path="/signup" element={<SignupChoice />} />
      <Route path="/signup/patient" element={<PatientSignup />} />
      <Route path="/signup/doctor" element={<DoctorSignup />} />

      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;