import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetProductsById } from "../services/productAPI";
import { useCartContext } from "../contexts/CartContext";
import { useWishlistContext } from "../contexts/WishlistContext";
import { FiCreditCard, FiLock, FiRefreshCcw, FiTruck } from "react-icons/fi";
import RelatedProducts from "../components/Products/RelatedProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCartContext();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistContext();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);

  const isWishlisted = wishlist?.some(
    (w) => String(w.productId || w._id) === String(id)
  );

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await apiGetProductsById(id);
      const prod =
        res?.data?.data?.product || res?.data?.product || res?.product || res;

      setProduct({
        ...prod,
        image: prod.image || prod.imageUrls?.[0] || "",
        rating: Number(prod.rating ?? 0),
        price: Number(prod.price ?? 0),
        sizes: prod.sizes || [],
      });

      if (prod?.sizes?.length === 1) {
        setSize(prod.sizes[0]);
      } else {
        setSize("");
      }
    } catch (error) {
      console.log("Single product fetch error: ", error);
    }
  };

  const handleAddToCart = async () => {
    if (product.sizes?.length > 0 && !size) {
      alert("Please select a size before adding to cart");
      return;
    }

    try {
      await addToCart(product._id, quantity, size || "");
      alert("Added to cart");
    } catch (err) {
      console.error("Add to cart failed: ", err);
      alert("Failed to add to cart");
    }
  };

  const handleBuyNow = async() => {
    if(product.sizes?.length > 0 && !size){
        alert("Please select a size.")
        return
    }

    try {
      await addToCart(product._id, quantity, size || "");
      navigate("/cart")
    } catch (err) {
      console.error("Buy Now failed: ", err);
      alert("Failed to Buy Now.");
    }
  }

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await removeFromWishlist({ productId: id });
      } else {
        await addToWishlist({ productId: id });
      }
    } catch (err) {
      console.error("Wishlist error: ", err);
    }
  };

  if (!product) {
    return (
      <div className="text-center py-5 fw-semibold">Loading product...</div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4 text-center mb-5">
          <div className="position-relative">
            <img
              src={product.image || product.imageUrls?.[0]}
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
            {/* <div className="position-absolute top-0 end-0 m-1 p-1 bg-transparent rounded-circle shadow-sm" style={{ zIndex: 5}} >
                                        <div style={{cursor: "pointer"}} onClick={handleWishlist}>
                                            <FaHeart color={isWishlisted ? "red" : "grey"} size={18}/>
                                        </div>
                                    </div> */}
            <button
              onClick={handleWishlist}
              className="position-absolute top-0 end-0  btn-light fs-4 border-0 rounded-circle bg-transparent shadow-sm"
            >
              {isWishlisted ? "❤️" : "🤍"}
            </button>
          </div>
          <div className="mt-4 d-grid gap-2">
            <button onClick={handleBuyNow} className="btn btn-primary btn-lg">Buy Now</button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <h3>{product.name}</h3>
          <p>
            {product.rating}{" "}
            <span className="mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    color:
                      idx < Math.round(product.rating || 0)
                        ? "#ffc107"
                        : "#ddd",
                  }}
                >
                  ★
                </span>
              ))}
            </span>
          </p>
          <h3 className="fw-bold">₹{product.price}</h3>
          <div className="mt-4">
            <p className="fw-semibold mb-1">Quantity:</p>
            <div className="d-flex align-items-center gap-3">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <h5 className="mb-0">{quantity}</h5>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setQuantity((q) => Math.max(1, q + 1))}
              >
                +
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="fw-semibold mb-1">Sizes:</p>
            <div className="d-flex gap-2">
              {product.sizes?.length > 0 ? (
                product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`btn ${
                      size === s ? "btn-primary" : "btn-outline-dark"
                    }`}
                  >
                    {s}
                  </button>
                ))
              ) : (
                <p className="text-muted">No sizes available</p>
              )}
            </div>
          </div>
          <hr />

          <div className="mt-2 p-3 border-rounded d-flex flex-wrap gap-4 bg-light">
            <div className="d-flex align-items-center gap-2">
              <FiRefreshCcw className="text-dark" size={18} />
              <span className="text-muted">10-Day Returnable</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FiCreditCard className="text-dark" size={18} />
              <span className="text-muted">Pay on Delivery</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FiTruck className="text-dark" size={18} />
              <span className="text-muted">Free Delivery</span>
            </div>

            <div className="d-flex align-items-center gap-2">
              <FiLock className="text-dark" size={18} />
              <span className="text-muted">Secure Payment</span>
            </div>
          </div>

          <hr />
          <div className="mt-4">
            <h5>Description:</h5>
            <ul className="list-unstyled mt-3 text-muted">
              <li>
                <strong>Artist: </strong>
                {product.artist || "N/A"}
              </li>
              <li>
                <strong>Reviews: </strong>
                {product.numReviews || "N/A"}
              </li>
              <li>
                <strong>Medium: </strong>
                {product.medium || "Canvas / Digital"}
              </li>
              <li>
                <strong>Weight: </strong>
                {product.weight || "Lightweight"}
              </li>
              <li>
                <strong>Availability: </strong>
                {product.availability || "In Stock"}
              </li>
              <li>
                <strong>Launch Year: </strong>
                {product.year || "2022"}
              </li>
              <li className="text-muted mt-2">{product.description}</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <hr />
        <RelatedProducts currentProductId={product._id} />
      </div>
    </div>
  );
};

export default ProductDetail;
