import { useState } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router";

const CheckoutAddress = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveAddress = async () => {
    await api.post("/address", {
      ...form,
      userId,
    });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Delivery Address
        </h1>

        <div className="space-y-4">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-transparent transition duration-200"
            />
          ))}
        </div>

        <button
          onClick={saveAddress}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl
          font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default CheckoutAddress;
