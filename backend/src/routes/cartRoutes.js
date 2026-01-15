import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require user to be logged in
router.use(protect);

router.get("/", getCart); // get current user's cart
router.post("/", addToCart); // add product
router.put("/:productId", updateCartItem); // update quantity
router.delete("/:productId", removeFromCart); // remove item

export default router;
