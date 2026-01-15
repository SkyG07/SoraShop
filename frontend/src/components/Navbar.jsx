import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { ShoppingCart, Settings, Sun, Moon, Store } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const navigate = useNavigate();

  // Theme state
  const [theme, setTheme] = useState("garden");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "garden" ? "dark" : "garden";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-base-100 shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="flex items-center space-x-2 text-2xl font-bold text-primary hover:text-secondary"
      >
        <Store size={28} />
        <span>SoraShop</span>
      </Link>

      {/* Links & Actions */}
      <div className="flex items-center space-x-4">
        <NavLink to="/" className="hover:text-primary font-medium">
          Products
        </NavLink>

        {user && user.role === "admin" && (
          <NavLink
            to="/admin"
            className="flex items-center space-x-1 px-3 py-1 bg-base-200 rounded hover:bg-base-300 transition"
          >
            <Settings size={18} />
            <span className="text-sm font-medium">Admin</span>
          </NavLink>
        )}

        {user && (
          <>
            <NavLink to="/cart" className="relative">
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </NavLink>

            <button
              onClick={handleLogout}
              className="btn btn-sm btn-ghost ml-2"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <NavLink to="/login" className="hover:text-primary font-medium">
              Login
            </NavLink>
            <NavLink to="/register" className="hover:text-primary font-medium">
              Register
            </NavLink>
          </>
        )}

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-square btn-ghost ml-2"
          title="Toggle Dark/Light Mode"
        >
          {theme === "garden" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
