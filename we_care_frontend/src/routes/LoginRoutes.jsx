import { Routes, Route } from "react-router-dom";
import LoginSignup from "../pages/Login-Signup";

const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
    </Routes>
  );
};

export default LoginRoutes;