import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
    inStock: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
