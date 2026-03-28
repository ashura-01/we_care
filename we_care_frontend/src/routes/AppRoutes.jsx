import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Doctors from "../pages/Doctors";
import Symptoms from "../pages/Symptoms";
import Hospitals from "../pages/Hospitals";

import LoginRoutes from "./LoginRoutes";
import AdminRoutes from "./AdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/symptoms" element={<Symptoms />} />
      <Route path="/hospitals" element={<Hospitals />} />

      
      <Route path="/login/*" element={<LoginRoutes />} />

      
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;