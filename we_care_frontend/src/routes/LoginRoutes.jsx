import { Routes, Route } from "react-router-dom";
// 1. Import your actual Login component instead of the placeholder
import Login from "../pages/Login"; 

const LoginRoutes = () => {
  return (
    <Routes>
      // 2. Tell the route to render your Login component
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default LoginRoutes;