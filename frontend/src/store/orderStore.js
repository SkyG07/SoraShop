import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";

export const useOrderStore = create((set, get) => ({
  orders: [],
  allOrders: [], // admin view

  // Place an order
  placeOrder: async () => {
    try {
      const res = await api.post("/orders");
      toast.success("Order placed successfully");
      return res.data;
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
      return null;
    }
  },

  // Fetch current user's orders
  fetchMyOrders: async () => {
    try {
      const res = await api.get("/orders/my");
      set({ orders: res.data });
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to fetch your orders");
    }
  },

  // Fetch all orders (admin)
  fetchAllOrders: async () => {
    try {
      const res = await api.get("/orders"); // admin endpoint
      set({ allOrders: res.data });
    } catch (error) {
      console.error("Failed to fetch all orders:", error);
      toast.error("Failed to fetch all orders");
    }
  },

  // Update order status (admin)
  updateOrderStatus: async (orderId, status) => {
    try {
      const res = await api.put(`/orders/${orderId}`, { status });
      set({
        allOrders: get().allOrders.map((o) =>
          o._id === orderId ? res.data : o
        ),
      });
      toast.success("Order status updated");
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    }
  },
}));
