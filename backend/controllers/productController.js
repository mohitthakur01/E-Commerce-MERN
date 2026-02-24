import product from "../models/product.js";

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const addProduct = await product.create(req.body);
    res.json({
      message: "product Created Successfully",
      addProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Get all Products
export const getProducts = async (req, res) => {
  try {
    const allProducts = await product.find().sort({ createdAt: -1 });
    res.json({
      message: "All products ",
      allProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const editProduct = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json({
      message: "Product updated Successfully ",
      editProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const removeProduct = await product.findByIdAndDelete(req.params.id);
    if (!removeProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.json({
      message: "Product Deleted Successfully",
      removeProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
