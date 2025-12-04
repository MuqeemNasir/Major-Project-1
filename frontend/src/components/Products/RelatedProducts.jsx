import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGetAllProducts } from "../../services/productAPI";
import { useCartContext } from "../../contexts/CartContext";
import { useWishlistContext } from "../../contexts/WishlistContext";

const RelatedProducts = ({ currentProductId }) => {
  const [random, setRandom] = useState([]);
  const { addToCart } = useCartContext();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistContext();

  useEffect(() => {
    fetchProducts();
  }, [currentProductId]);

  const fetchProducts = async () => {
    try {
      const res = await apiGetAllProducts();
      const data = res?.product || res?.data?.product || res?.data || res || [];

      // Filter out current product & pick 4
      const filtered = data.filter((p) => p._id !== currentProductId);

      const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4);

      setRandom(shuffled);
    } catch (err) {
      console.log("Random products fetch error", err);
    }
  };

  return (
    <div className="mt-5">
      <h4 className="fw-bold mb-3">Related Products</h4>
      <div className="row g-4">
        {random.map((p) => {
          const isWishlisted = wishlist?.some(
            (w) => String(w.productId || w._id) === String(p._id)
          );
          return (
            <div className="col-6 col-md-3 text-center" key={p._id}>
              <div className="position-relative">
                <Link
                  to={`/product/${p._id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={p.image || p.imageUrls?.[0]}
                    className="rounded shadow-sm"
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    isWishlisted
                      ? removeFromWishlist({ productId: p._id })
                      : addToWishlist({ productId: p._id });
                  }}
                  className="position-absolute top-0 end-0  btn-light fs-4 border-0 rounded-circle bg-transparent shadow-sm"
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </button>
              </div>
              <h6 className="mt-2 mb-1 text-truncate">{p.name}</h6>
              <p className="fw-bold text-dark mb-2">₹{p.price}</p>
              <button
                className="btn btn-secondary btn-sm w-100"
                onClick={() => addToCart(p._id, 1, null)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
