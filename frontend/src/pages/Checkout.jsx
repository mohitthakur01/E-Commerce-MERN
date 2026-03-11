import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [selectAddress, setSelectAddress] = useState(null);
  const [address, setAddress] = useState([]);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    api.get(`/cart/${userId}`).then((res) => setCart(res.data));

    api.get(`/address/${userId}`).then((res) => {
      setAddress(res.data);
      setSelectAddress(res.data[0]);
    });
  }, []);

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  const total = cart.items.reduce(
    (sum, i) => sum + i.quantity * i.productId.price,
    0
  );

  const placeOrder = async () => {
    if (!selectAddress) {
      alert("Please select an address");
      return;
    }

    try {
      const res = await api.post("/order/place", {
        userId,
        address: selectAddress,
      });

      navigate(`/order-success/${res.data._id}`);
    } catch (error) {
      console.error("Order failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        {/* Address Section */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Select Address
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {address.map((addr) => (
            <label
              key={addr._id}
              className="border rounded-xl p-4 bg-gray-50 cursor-pointer hover:shadow-md flex gap-3"
            >
              <input
                type="radio"
                name="address"
                checked={selectAddress?._id === addr._id}
                onChange={() => setSelectAddress(addr)}
              />

              <div>
                <strong className="text-gray-800">{addr.fullName}</strong>

                <p className="text-sm text-gray-600">
                  {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                </p>

                <p className="text-sm text-gray-500">{addr.phone}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Total Amount
          </h2>

          <p className="text-2xl font-bold text-blue-600">₹{total}</p>
        </div>

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          className="mt-6 w-full md:w-1/3 bg-blue-600 text-white py-3 rounded-xl 
          font-semibold hover:bg-blue-700 transition shadow-md"
        >
          Place Order (COD)
        </button>
      </div>
    </div>
  );
};

export default Checkout;