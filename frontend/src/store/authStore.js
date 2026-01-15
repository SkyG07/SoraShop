import { create } from "zustand";
import api from "../services/api";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  login: async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.token);
    set({ user: res.data, token: res.data.token });
  },

  register: async (data) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("user", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.token);
    set({ user: res.data, token: res.data.token });
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, token: null });
  },
}));
