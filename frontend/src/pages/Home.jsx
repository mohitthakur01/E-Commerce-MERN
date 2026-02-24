import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProduct = async () => {
    const res = await api.get(
      `/products?search=${search}&category=${category}`,
    );
    setProduct(res.data.allProducts);
  };

  useEffect(() => {
    loadProduct();
  }, [search, category]);

  return (
   <div className="min-h-screen bg-gray-100 p-6">

  {/* Top Controls */}
  <div className="max-w-7xl mx-auto mb-8">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      {/* Search */}
      <div className="w-full md:w-1/2 relative">
        <input
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent transition duration-300"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.6-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Filter */}
      <select
        onChange={(e) => setCategory(e.target.value)}
        className="w-full md:w-1/4 px-4 py-3 border border-gray-300 rounded-xl shadow-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 
        focus:border-transparent transition duration-300 bg-white"
      >
        <option value="">All Category</option>
        <option value="tablet">Tablet</option>
        <option value="Mobile">Mobile</option>
        <option value="Clothing">Clothing</option>
      </select>

    </div>
  </div>

  {/* Product Grid */}
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

    {product.map((item) => (
      <Link
        key={product._id}
        to={`/product/${item._id}`}
        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col"
      >
        <div className="h-48 w-full mb-4 overflow-hidden rounded-xl">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {item.title}
        </h2>

        <p className="text-blue-600 font-bold mb-2">
          ₹{item.price}
        </p>

        <p className="text-sm text-gray-500 line-clamp-2">
          {item.description}
        </p>
      </Link>
    ))}
    
  </div>

</div>
  );
};

export default Home;
