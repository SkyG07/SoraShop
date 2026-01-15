import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useOrderStore } from "../store/orderStore";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const {
    products,
    fetchProducts,
    createProduct,
    deleteProduct,
    updateProduct,
  } = useProductStore();
  const { orders, fetchAllOrders, updateOrderStatus } = useOrderStore();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    stock: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchAllOrders();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProduct({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      toast.success("Product created");
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
        stock: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const [updating, setUpdating] = useState(false);

  const updateHandler = async () => {
    if (!editingProduct) return;

    setUpdating(true);
    try {
      // Ensure numbers are numbers
      const updatedData = {
        ...editingProduct,
        price: Number(editingProduct.price),
        stock: Number(editingProduct.stock),
      };

      await updateProduct(editingProduct._id, updatedData);

      toast.success("Product updated");
      setEditingProduct(null);
    } catch (err) {
      console.error(err); // <-- log error
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* ADD PRODUCT */}
      <form
        onSubmit={submitHandler}
        className="card bg-base-100 shadow p-5 mb-10"
      >
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <input
            className="input input-bordered"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="input input-bordered"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            className="input input-bordered"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>
        <textarea
          className="textarea textarea-bordered w-full mt-3"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <input
            className="input input-bordered"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <input
            className="input input-bordered"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Creating..." : "Create Product"}
          </button>
        </div>
      </form>

      {/* PRODUCTS TABLE */}
      <div className="overflow-x-auto mb-12">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₱{p.price}</td>
                <td>{p.stock}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-warning"
                    onClick={() => setEditingProduct(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteHandler(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ORDERS TABLE */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.user?.email}</td>
                  <td>₱{order.totalPrice}</td>
                  <td>{order.status}</td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editingProduct && (
        <dialog open className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Product</h3>

            <input
              className="input input-bordered w-full mb-2"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />

            <textarea
              className="textarea textarea-bordered w-full mb-2"
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  description: e.target.value,
                })
              }
            />

            <input
              className="input input-bordered w-full mb-2"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  category: e.target.value,
                })
              }
            />

            <input
              className="input input-bordered w-full mb-2"
              value={editingProduct.image} // <-- Add this
              placeholder="Image URL"
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  image: e.target.value,
                })
              }
            />

            <input
              className="input input-bordered w-full mb-2"
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />

            <input
              className="input input-bordered w-full mb-4"
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
            />

            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={updateHandler}
                disabled={updating}
              >
                {updating ? "Saving..." : "Save"}
              </button>
              <button className="btn" onClick={() => setEditingProduct(null)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AdminDashboard;
