import { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { ShoppingCart } from "lucide-react";

const ProductsPage = () => {
  const { products, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeModal = () => setSelectedProduct(null);

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, quantity); // store handles login + toast
    closeModal();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="card bg-base-100 shadow hover:shadow-lg cursor-pointer"
          >
            <figure onClick={() => openModal(product)}>
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-lg font-semibold">₱{product.price}</p>
              <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => openModal(product)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-xl mb-4">{selectedProduct.name}</h3>
            <img
              src={selectedProduct.image || "/placeholder.png"}
              alt={selectedProduct.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <p className="mb-2">
              <span className="font-semibold">Category: </span>
              {selectedProduct.category}
            </p>
            <p className="mb-2">{selectedProduct.description}</p>
            <p className="mb-4 font-semibold text-lg">
              ₱{selectedProduct.price}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Stock: </span>
              {selectedProduct.stock}
            </p>

            {/* Quantity selector */}
            <div className="flex items-center gap-2 mb-4">
              <button
                className="btn btn-sm"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="btn btn-sm"
                onClick={() =>
                  setQuantity((q) => Math.min(selectedProduct.stock, q + 1))
                }
              >
                +
              </button>
            </div>

            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </button>
              <button className="btn btn-ghost" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ProductsPage;
