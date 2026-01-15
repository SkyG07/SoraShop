import { create } from "zustand";
import toast from "react-hot-toast";

const CART_STORAGE_KEY = "sorashop_cart";

export const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [],

  addToCart: (product, quantity = 1) => {
    const existing = get().cart.find((item) => item._id === product._id);
    let newCart;
    if (existing) {
      newCart = get().cart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...get().cart, { ...product, quantity }];
    }
    set({ cart: newCart });
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  },

  removeFromCart: (productId) => {
    const newCart = get().cart.filter((item) => item._id !== productId);
    set({ cart: newCart });
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    toast.success("Removed from cart");
  },

  updateQuantity: (productId, quantity) => {
    const newCart = get().cart.map((item) =>
      item._id === productId ? { ...item, quantity } : item
    );
    set({ cart: newCart });
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem(CART_STORAGE_KEY);
  },
}));
