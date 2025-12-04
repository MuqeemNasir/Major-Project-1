import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { useWishlistContext } from "../contexts/WishlistContext";
import { useEffect } from "react";

const CartPage = () => {
  const { cart, loadCart, removeItemFromCart, updateCart } = useCartContext();
  const { wishlist, addToWishlist, loadWishlist, removeFromWishlist } = useWishlistContext();

  const navigate = useNavigate()

  useEffect(() => {
    loadCart();
  }, []);

  const handleQtyChange = async (item, newQty) => {
    if (newQty < 1) return;
    const productId = item.product._id || item.product;
    await updateCart(productId, newQty, item.size || "");
  };

  const isWishlisted = (productId) =>
    wishlist?.some(
      (w) => String(w?.product?._id || w?.productId) === String(productId)
    );

  // const toggleWishlist = async (item) => {
  //   const productId = item.product?._id || item.product
  //   if (isWishlisted(productId)) {
  //     removeFromWishlist({ productId });
  //   } else {
  //     await addToWishlist({ productId });
  //     await removeItemFromCart(productId, item.size || "")
  //   }
  // };

  const moveToWishlist = async (item) => {
  try {
    const productId = item.product?._id || item.product;
    const size = item.size || "";

    await addToWishlist({ productId });

    await removeItemFromCart(productId, size);

    await loadCart();
    loadWishlist && (await loadWishlist());

  } catch (err) {
    console.error("Error moving item to wishlist:", err);
  }
};


  const calculateDiscountPrice = (price, qty) => Math.floor(price * qty * 0.5);

  if (!cart?.length) {
    return <h3 className="text-center py-5 fw-bold">🛒 Cart is Empty</h3>;
  }

  const price = cart.reduce(
    (t, i) => t + (i.product?.price || 0) * i.quantity,
    0
  );

  const discount = cart.reduce(
    (t, i) => t + calculateDiscountPrice(i.product.price || 0, i.quantity || 0),
    0
  );

  const delivery = 499;
  const total = price - discount + delivery;

  return (
    <div className="container py-4">
      <h3 className="fw-bold text-center mb-4">MY CART ({cart.length})</h3>

      <div className="row g-4">
        {/* LEFT: ITEMS */}
        <div className="col-md-8">
          {cart.map((item) => {
            const product = item.product;
            const productId = product?._id || product;
            return (
              <div key={item._id} className="card p-3 shadow-sm border-0 mb-4">
                <div className="d-flex gap-3">
                  {/* IMAGE */}
                  <Link to={`/product/${productId}`}>
                    <img
                      src={product?.imageUrls?.[0] || product?.image}
                      alt={product?.name}
                      className="rounded"
                      style={{
                        width: "180px",
                        height: "220px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>

                  {/* DETAILS */}
                  <div className="flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="fw-semibold">{product?.name}</h5>

                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold text-dark fs-5">
                          ₹
                          {calculateDiscountPrice(
                            product?.price || 0,
                            item.quantity
                          )}
                        </span>
                        <span className="text-muted text-decoration-line-through">
                          ₹{(product?.price || 0) * (item.quantity || 0)}
                        </span>
                      </div>
                      <span className="text-secondary fw-semibold">
                        50% OFF
                      </span>

                      <div className="mt-2">
                        <small className="text-muted">
                          Size: <strong>{item.size || "-"}</strong>
                        </small>
                      </div>

                      {/* Qty */}
                      <div className="mt-3 d-flex align-items-center gap-2">
                        <span className="fw-semibold">Qty:</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleQtyChange(item, (item.quantity || 1) - 1)
                          }
                        >
                          -
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            handleQtyChange(item, (item.quantity || 1) + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="d-grid gap-3 mt-3">
                      <button
                        className="btn btn-secondary btn-sm w-50"
                        onClick={() =>
                          removeItemFromCart(productId, item.size || "")
                        }
                      >
                        Remove From Cart
                      </button>

                      <button
                        className="btn btn-outline-secondary btn-sm w-50"
                        onClick={() => moveToWishlist(item)}
                      >
                        {isWishlisted(productId) ? "❤️" : "🤍"} Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT PRICE CARD */}
        <div className="col-md-4">
          <div className="card shadow-sm p-4 border-0">
            <h5 className="fw-bold mb-3">PRICE DETAILS</h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Price ({cart.length} items)</span>
              <span>₹{price}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Discount</span>
              <span className="text-success">- ₹{discount}</span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Delivery Charges</span>
              <span>₹{delivery}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>

            <p className="text-success small mt-2">
              You will save ₹{discount} on this order 🎉
            </p>

            <button className="btn btn-primary w-100 fw-semibold mt-3" onClick={() => navigate('/address')}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
