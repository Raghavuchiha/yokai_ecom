import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import adminApi from "./adminApi";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi
      .get("/tables")
      .then((res) => setTables(res.data))
      .catch((error) => toast.error(error.response?.data?.detail || "Failed to load tables"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="p-6">
        <h2 className="text-2xl font-light mb-6">Database tables</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tables.map((name) => (
              <Link
                key={name}
                to={`/admin/${name}`}
                className="border border-gray-300 rounded p-6 text-center capitalize hover:bg-gray-100 transition"
              >
                {name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
