import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/axios.js";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <p className="text-2xl font-semibold text-blue-600 mb-6">
            ₹{product.price}
          </p>

          <button
            className="w-full md:w-1/2 bg-blue-600 text-white py-3 rounded-xl 
        font-semibold hover:bg-blue-700 transition duration-300 
        shadow-md hover:shadow-lg"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
