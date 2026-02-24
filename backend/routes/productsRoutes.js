import express from "express";

import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getSingleProduct
} from "../controllers/productController.js";

const router = express.Router();

// Create New Product
router.post("/add", createProduct);

// Get All Product
router.get("/", getProducts);

// Update A Product
router.put("/update/:id", updateProduct);

// Delete A Product
router.delete("/delete/:id", deleteProduct);

router.get("/:id", getSingleProduct); 

export default router;
