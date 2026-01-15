import Order from "../models/Order.js";
import User from "../models/User.js";

// CREATE order
export const createOrder = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");

  if (user.cart.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  const orderItems = user.cart.map((item) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));

  const totalPrice = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    user: user._id,
    orderItems,
    totalPrice,
  });

  user.cart = [];
  await user.save();

  res.status(201).json(order);
};

// GET user orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// ADMIN – get all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};
