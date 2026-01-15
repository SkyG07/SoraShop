import axios from "axios";

const api = axios.create({
  baseURL: "https://sorashop.onrender.com/api",
});

// Add token automatically if user is logged in
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
