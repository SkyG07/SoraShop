import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";
import { useAuthStore } from "./authStore";

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,

  fetchCart: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set({ loading: true });
    try {
      const res = await api.get("/cart");
      set({ cart: res.data });
    } catch (err) {
      toast.error("Failed to fetch cart");
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (product, quantity = 1) => {
    const user = useAuthStore.getState().user;

    if (!user) {
      // Stop here, don't proceed
      toast.error("Login to add products to cart");
      return; // <-- crucial!
    }

    try {
      const res = await api.post("/cart", { productId: product._id, quantity });
      set({ cart: res.data });
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  },

  removeFromCart: async (productId) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      set({ cart: res.data });
      toast.success("Removed from cart");
    } catch (err) {
      toast.error("Failed to remove item");
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      const res = await api.put(`/cart/${productId}`, { quantity });
      set({ cart: res.data });
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  },

  clearCart: async () => {
    const items = get().cart.map((item) => item.product._id);
    try {
      await Promise.all(items.map((id) => api.delete(`/cart/${id}`)));
      set({ cart: [] });
    } catch (err) {
      toast.error("Failed to clear cart");
    }
  },
}));
