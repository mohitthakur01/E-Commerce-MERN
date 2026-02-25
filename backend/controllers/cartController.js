import Cart from "../models/cart.js";

// Add Item To Cart

export const addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            quantity: 1,
          },
        ],
      });
    } else {
      const item = cart.items.find((i) => i.productId.toString() === productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();

    res.status(200).json({
      message: "Item removed From Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

// Update Item In cart
export const updateQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Item quantity updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get cart by user ID
export const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
