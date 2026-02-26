import { useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
  const loadCart = async () => {
    if (!userId) {
      setCartCount(0);
      return;
    }

    try {
      const res = await api.get(`/cart/${userId}`);

      const total = res.data.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      setCartCount(total);
    } catch (err) {
      setCartCount(0);
    }
  };

  loadCart();

  // 🔥 Listen for update
  window.addEventListener("cartUpdate", loadCart);

  return () => {
    window.removeEventListener("cartUpdate", loadCart);
  };

}, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          E-Commerce
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-2xl hover:scale-110 transition"
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {!userId ? (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition font-medium"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button
              onClick={logout}
              className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-900 transition shadow-sm"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
