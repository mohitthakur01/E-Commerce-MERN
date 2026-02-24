import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    inStock: "",
  });

  const loadProduct = async () => {
    const res = await api.get(`/products/${id}`);

    setForm((prev) => ({
      ...prev,
      ...res.data,
    }));
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "inSock",
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/update/${id}`, form);
      alert("Product Updated Successfully");
      navigate("/admin/products");
    } catch (error) {
      console.log("unable to update", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {allowedFields.map(
            (key) =>
              allowedFields.includes(key) && (
                <input
                  key={key}
                  name={key}
                  value={form[key] || ""}
                  placeholder={key}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
              ),
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition duration-300 shadow-md"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
