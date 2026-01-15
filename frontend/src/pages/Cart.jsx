import { useCartStore } from "../store/cartStore";
import { ShoppingCart, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-6">Add some products to see them here!</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <ShoppingCart size={28} /> Your Cart
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td className="flex items-center gap-3">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span>{item.name}</span>
                </td>
                <td>₱{item.price}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="btn btn-xs"
                      onClick={() =>
                        updateQuantity(
                          item._id,
                          Math.min(item.stock, item.quantity + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>₱{item.price * item.quantity}</td>
                <td>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total & Checkout */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-xl font-semibold">
          Total: ₱{totalPrice.toFixed(2)}
        </div>
        <div className="flex gap-3">
          <button
            className="btn btn-ghost"
            onClick={() => {
              clearCart();
              toast.success("Cart cleared");
            }}
          >
            Clear Cart
          </button>
          <button
            className="btn btn-primary"
            onClick={() => toast.success("Checkout not implemented yet")}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
