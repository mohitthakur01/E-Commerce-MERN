import { useState, useEffect } from "react";
import api from "../api/axios.js";
import { Link } from "react-router";

const Products = () => {
  const loadProducts = async () => {
    const response = await api.get("/products");
    setProducts(response.data.allProducts);
  };

  const deletedProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product Deleted SuccessfuLLy");
      loadProducts();
    } catch (error) {
      console.log("unable to delete product", error);
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Product List</h2>

          <Link
            to="/admin/products/add"
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition duration-300 shadow-md"
          >
            + Add New Product
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3 font-semibold">Title</th>
                <th className="p-3 font-semibold">Price</th>
                <th className="p-3 font-semibold">Category</th>
                <th className="p-3 font-semibold">Stock</th>
                <th className="p-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="p-3">{product.title}</td>
                  <td className="p-3 font-medium text-green-600">
                    ₹{product.price}
                  </td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">
                    {product.inStock}
                  </td>

                  <td className="p-3 flex items-center justify-center gap-3">
                    <Link
                      to={`/admin/products/update/${product._id}`}
                      className="px-4 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition duration-200"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deletedProduct(product._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-6 text-gray-500">
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
