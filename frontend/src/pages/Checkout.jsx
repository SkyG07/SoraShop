import { useOrderStore } from "../store/orderStore";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { placeOrder } = useOrderStore();
  const navigate = useNavigate();

  const checkoutHandler = async () => {
    await placeOrder();
    navigate("/orders");
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 card bg-base-100 shadow-xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">Review your cart and place your order.</p>

      <button className="btn btn-success w-full" onClick={checkoutHandler}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
