import { create } from "zustand";
import api from "../services/api";
import toast from "react-hot-toast";

export const useProductStore = create((set, get) => ({
  products: [],

  // Fetch all products
  fetchProducts: async () => {
    try {
      const res = await api.get("/products");
      set({ products: res.data });
    } catch (err) {
      console.error("Failed to fetch products:", err);
      toast.error("Failed to fetch products");
    }
  },

  // Create a new product (Admin)
  createProduct: async (productData) => {
    try {
      const res = await api.post("/products", productData);
      set({ products: [...get().products, res.data] });
      return res.data; // <-- return created product
    } catch (err) {
      console.error("Failed to create product:", err);
      toast.error(err.response?.data?.message || "Failed to create product");
      throw err;
    }
  },

  // Update a product (Admin)
  updateProduct: async (id, updatedData) => {
    try {
      const res = await api.put(`/products/${id}`, updatedData);
      set({
        products: get().products.map((p) => (p._id === id ? res.data : p)),
      });
      return res.data;
    } catch (err) {
      console.error("Failed to update product:", err);
      toast.error(err.response?.data?.message || "Failed to update product");
      throw err;
    }
  },

  // Delete product (Admin)
  deleteProduct: async (id) => {
    try {
      await api.delete(`/products/${id}`);
      set({ products: get().products.filter((p) => p._id !== id) });
    } catch (err) {
      console.error("Failed to delete product:", err);
      toast.error(err.response?.data?.message || "Failed to delete product");
      throw err;
    }
  },
}));
