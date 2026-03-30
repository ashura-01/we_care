// routes/AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import DoctorList from "../pages/DoctorsList";
import Symptoms from "../pages/Symptoms";
import Hospitals from "../pages/Hospitals";
import AdminRoutes from "./AdminRoutes";
import SignupChoice from "../pages/SignupChoice";
import PatientSignup from "../pages/PatientSignup";
import DoctorSignup from "../pages/DoctorSignup";
import Login from "../pages/Login"; // Import your actual login component
import DoctorProfile from "../pages/DoctorProfile";
import { ProtectedRoute } from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={
        <ProtectedRoute redirectIfAuthenticated={true}>
          <Login />
        </ProtectedRoute>
      } />
      
      <Route path="/signup" element={
        <ProtectedRoute redirectIfAuthenticated={true}>
          <SignupChoice />
        </ProtectedRoute>
      } />
      
      <Route path="/signup/patient" element={
        <ProtectedRoute redirectIfAuthenticated={true}>
          <PatientSignup />
        </ProtectedRoute>
      } />
      
      <Route path="/signup/doctor" element={
        <ProtectedRoute redirectIfAuthenticated={true}>
          <DoctorSignup />
        </ProtectedRoute>
      } />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      
      <Route path="/doctors" element={
        <ProtectedRoute>
          <DoctorList />
        </ProtectedRoute>
      } />
      
      <Route path="/symptoms" element={
        <ProtectedRoute>
          <Symptoms />
        </ProtectedRoute>
      } />
      
      <Route path="/hospitals" element={
        <ProtectedRoute>
          <Hospitals />
        </ProtectedRoute>
      } />

      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminRoutes />
        </ProtectedRoute>
      } />

      <Route path="/doctor/:id" element={
        <ProtectedRoute>
          <DoctorProfile />
        </ProtectedRoute>
      } />

    </Routes>
  );
};

export default AppRoutes;