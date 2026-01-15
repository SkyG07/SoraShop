import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";

const ProductDetails = () => {
  const { id } = useParams();
  const { fetchProductById } = useProductStore();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id).then(setProduct);
    }
  }, [id, fetchProductById]);

  if (!product) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-4">{product.description}</p>
      <p className="mt-2 text-xl font-semibold">₱{product.price}</p>

      <button
        className="btn btn-primary mt-4"
        onClick={() => addToCart(product._id, 1)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
