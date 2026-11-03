import { Navigate, Outlet } from "react-router-dom";
import { getAdminToken } from "./adminApi";

const AdminRoute = () =>
  getAdminToken() ? <Outlet /> : <Navigate to="/admin/login" replace />;

export default AdminRoute;
