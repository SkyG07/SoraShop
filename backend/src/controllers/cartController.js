import Cart from "../models/Cart.js"; // create Cart model
import Product from "../models/Product.js";

// GET cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  res.json(cart?.items || []);
};

// ADD to cart
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find(
    (i) => i.product.toString() === productId
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  const populatedCart = await cart.populate("items.product");
  res.json(populatedCart.items);
};

// UPDATE quantity
export const updateCartItem = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.product.toString() === productId);
  if (!item) return res.status(404).json({ message: "Product not in cart" });

  item.quantity = quantity;
  await cart.save();
  const populatedCart = await cart.populate("items.product");
  res.json(populatedCart.items);
};

// REMOVE item
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  const populatedCart = await cart.populate("items.product");
  res.json(populatedCart.items);
};
