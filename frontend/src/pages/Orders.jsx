import { useEffect } from "react";
import { useOrderStore } from "../store/orderStore";

const Orders = () => {
  const { orders, fetchMyOrders } = useOrderStore();

  useEffect(() => {
    fetchMyOrders();
  }, []);
  if (orders.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        You have not placed any orders yet.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div key={order._id} className="card bg-base-100 shadow-md mb-4 p-4">
          <p>Order ID: {order._id}</p>
          <p>Total: ₱{order.totalPrice}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
