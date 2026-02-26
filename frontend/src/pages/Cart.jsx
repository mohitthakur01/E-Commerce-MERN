import { useEffect, useState } from "react";
import api from "../api/axios.js";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);

  // Load Cart data
  const loadCart = async () => {
    if (!userId) return;
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Remove item completely
  const removeItems = async (productId) => {
    try {
      await api.post(`/cart/remove`, { userId, productId });
      loadCart();
      window.dispatchEvent(new Event("cartUpdate"));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Update item quantity
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
    return <div>Loading...</div>;
  }

  // Prevent crash if items is undefined
  if (!cart.items || cart.items.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  // Calculate total
const total = cart.items.reduce(
  (sum, item) => sum + item.productId.price * item.quantity,
  0
);

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.items.map((item) => (
        <div
          key={item.productId._id}
          style={{
            display: "flex",
            gap: "20px",
            marginBottom: "20px",
            borderBottom: "1px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          <div>
            <img
              src={item.productId.image}
              alt={item.productId.title}
              width="100"
            />
          </div>

          <div>
            <h2>{item.productId.title}</h2>
            <p>₹ {item.productId.price.toFixed(2)}</p>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button
                onClick={() => updateQty(item.productId._id, item.quantity - 1)}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => updateQty(item.productId._id, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <button
              style={{ marginTop: "10px", color: "red" }}
              onClick={() => removeItems(item.productId._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2>Total: ₹ {total.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
