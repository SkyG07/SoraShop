import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>₱{product.price}</p>

        <div className="card-actions justify-end">
          <Link to={`/products/${product._id}`} className="btn btn-primary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
