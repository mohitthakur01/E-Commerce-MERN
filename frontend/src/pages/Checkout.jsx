import { useState, useEffect } from "react";
import api from "../api/axios.js";

const Checkout = () => {
  const userId = localStorage.getItem("userId");
  const [address, setAddress] = useState([]);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => setAddress(res.data));
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Checkout
        </h1>

        {/* Address Section */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Select Address
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {address.map((addr) => (
            <div
              key={addr.id}
              className="border rounded-xl p-4 hover:shadow-md transition bg-gray-50"
            >
              <p className="font-semibold text-gray-800">
                {addr.fullName}
              </p>

              <p className="text-gray-600">
                {addr.phone}
              </p>

              <p className="text-gray-500 text-sm">
                {addr.addressLine}, {addr.city}, {addr.state}
              </p>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-6 flex items-center justify-between">

          <h2 className="text-xl font-semibold text-gray-800">
            Total Amount
          </h2>

          <p className="text-2xl font-bold text-blue-600">
            ₹{total}
          </p>

        </div>

        {/* Place Order Button */}
        <button
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