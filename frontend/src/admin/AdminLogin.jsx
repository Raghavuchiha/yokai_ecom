import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import adminApi, { setAdminToken } from "./adminApi";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await adminApi.post("/login", { username, password });
      setAdminToken(res.data.access_token);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-20">
      <div className="w-full max-w-md p-6 text-center">
        <h2 className="text-3xl font-light mb-6">Admin Login —</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Admin ID"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-3 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-3 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
