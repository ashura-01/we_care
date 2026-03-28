import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard.jsx";

const AdminRoutes = () => {
  const { user } = { user: true };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AdminRoutes;