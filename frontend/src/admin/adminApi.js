import axios from "axios";
import API_URL from "../config";

const TOKEN_KEY = "admin_token";

export const getAdminToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setAdminToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);
export const clearAdminToken = () => sessionStorage.removeItem(TOKEN_KEY);

const adminApi = axios.create({ baseURL: `${API_URL}/admin` });

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (error) => {
    const isLogin = error.config?.url?.includes("/login");
    if (error.response?.status === 401 && !isLogin) {
      clearAdminToken();
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default adminApi;
