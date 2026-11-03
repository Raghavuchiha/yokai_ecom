import { Link, useNavigate } from "react-router-dom";
import { clearAdminToken } from "./adminApi";

const AdminHeader = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAdminToken();
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
      <Link to="/admin" className="text-xl font-light">
        YOKAI <span className="text-gray-500">Admin</span>
      </Link>
      <button
        onClick={logout}
        className="text-sm border border-gray-300 px-3 py-1 rounded hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHeader;
