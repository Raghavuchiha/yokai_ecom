import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

// Blocks pages that need a logged-in user. Guests are sent to /login
// and returned to the page they wanted after signing in.
const ProtectedRoute = () => {
  const { token } = useContext(ShopContext);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

export default ProtectedRoute;
