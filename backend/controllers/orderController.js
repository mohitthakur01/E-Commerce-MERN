import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

// Create a New Order
export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Get user's cart
    const userCart = await Cart.findOne({ userId }).populate("items.productId");

    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Prepare order items
    const orderItems = userCart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }));

    // Calculate total
    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Deduct stock
    for (let item of userCart.items) {
      await Product.findByIdAndUpdate(
        item.productId._id,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Create order
    const newOrder = await Order.create({
      userId,
      items: orderItems,
      address,
      totalAmount,
      paymentMethod: "COD",
    });

    // Clear cart
    await Cart.findOneAndUpdate({ userId }, { items: [] });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};