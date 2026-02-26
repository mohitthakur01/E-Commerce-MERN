import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProduct = async () => {
    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}`
      );
      setProducts(res.data.allProducts);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };
  

  useEffect(() => {
    loadProduct();
  }, [search, category]);

const addToCart = async (productId) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login to add items in cart");
    return;
  }

  try {
    await api.post("/cart/add", { userId, productId });


    window.dispatchEvent(new Event("cartUpdate"));

  } catch (err) {
    console.error("Add to cart error:", err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 border rounded-xl"
          />

          {/* Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/4 px-4 py-3 border rounded-xl"
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
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 flex flex-col"
          >
            <Link to={`/product/${item._id}`}>
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

            <button
              onClick={() => addToCart(item._id)}
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
            >
              Add To Cart 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;