import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);

  const loadCart = async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };
  const navigate = useNavigate()

  useEffect(() => {
    loadCart();
  }, []);

  const removeItems = async (productId) => {
    try {
      await api.post(`/cart/remove`, { userId, productId });
      loadCart();
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const updateQty = async (productId, quantity) => {
    try {
      if (quantity === 0) {
        await removeItems(productId);
        return;
      }

      await api.post(`/cart/update`, { userId, productId, quantity });
      loadCart();
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cart.items.map((item) => (
          <div
            key={item.productId._id}
            className="flex gap-6 items-center border-b py-6"
          >
            <img
              src={item.productId.image}
              alt={item.productId.title}
              className="w-24 h-24 object-contain bg-gray-100 rounded-lg"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {item.productId.title}
              </h2>

              <p className="text-blue-600 font-semibold mt-1">
                ₹ {item.productId.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity - 1)
                  }
                >
                  -
                </button>

                <span className="font-medium">{item.quantity}</span>

                <button
                  className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                className="text-red-500 text-sm mt-3 hover:underline"
                onClick={() => removeItems(item.productId._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-8">
          <h2 className="text-xl font-bold">
            Total: ₹ {total.toFixed(2)}
          </h2>

          <button
            onClick={() => navigate("/checkout-address")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;