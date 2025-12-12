import { Link, useNavigate } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";
import { useWishlistContext } from "../contexts/WishlistContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CartPage = () => {
  const { cart, loadCart, removeItemFromCart, updateCart, loading } = useCartContext();
  const { wishlist, addToWishlist } = useWishlistContext();

  const navigate = useNavigate()

  useEffect(() => {
    loadCart();
  }, []);

  const handleQtyChange = async (item, newQty) => {
    if (newQty < 1) return;
    const productId = item.product._id || item.product;
    await updateCart(productId, newQty, item.size || "");
  };

  const handleRemove = async(item) => {
    const productId = item.product._id || item.product
    try{
      await removeItemFromCart(productId, item.size || "")
      toast. warn("Item removed")
    }catch(err){
      toast.error("Failed to remove item")
    }
  }

  // const isWishlisted = (productId) =>
  //   wishlist?.some(
  //     (w) => String(w?.product?._id || w?.productId) === String(productId)
  //   );



  const moveToWishlist = async (item) => {
    const productId = item.product?._id || item.product;
    const size = item.size || "";
    
    try {
      const exists = wishlist?.some(w => String(w.product?._id || w.productId || w) === String(productId))
      if(!exists) await addToWishlist({ productId });

      await removeItemFromCart(productId, size);
      toast.success("Moved to Wishlist")
    } catch (err) {
      toast.error("Failed to move to wishlist");
    }
};

  const calculateDiscountPrice = (price, qty) => Math.floor(price * qty * 0.5);
  const price = cart.reduce(
    (t, i) => t + (i.product?.price || 0) * i.quantity,
    0
  );

  const discount = cart.reduce(
    (t, i) => t + calculateDiscountPrice(i.product.price || 0, i.quantity || 0),
    0
  );

  const deliveryCharge = 499;
  const total = price - discount + deliveryCharge;

  if (!cart?.length && !loading){
    return(
      <div className="container text-center py-5">
        <h3 className="fw-bold text-muted">🛒 Cart is Empty</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate(`/products`)}>Shop Now</button>
      </div>
    )
  }

  return (
    <div className="container py-4 mb-5">
      <h3 className="fw-bold text-center mb-4 text-uppercase">My Cart ({cart.length})</h3>
      <div className="row g-4 justify-content-center">
        <div className="col-lg-7 col-md-10">
          {cart.map((item) => {
            const product = item.product;
            const productId = product?._id || product;
            return (
              <div key={item._id} className="card shadow-sm border-0 mb-4 overflow-hidden">
                <div className="row g-0 h-100">
                  <div className="col-5 bg-light p-0 d-flex align-items-stretch">
                  <Link to={`/product/${productId}`} className="w-100 position-relative" style={{minHeight: "220px"}}>
                    <img src={product?.imageUrls?.[0] || product?.image} alt={product?.name} className="w-100 h-100 position-absolute top-0 start-0" style={{objectFit: "cover"}}/>
                  </Link>
                  </div>
                  <div className="col-7">
                  <div className="card-body h-100 d-flex flex-column justify-content-center p-3">
                      <h5 className="fw-bold mb-1 text-truncate">{product?.name}</h5>
                      <div className="mb-2 d-flex align-items-center flex-wrap gap-2">
                        <span className="fw-bold fs-5">
                          ₹
                          {calculateDiscountPrice(product?.price, 1)}
                        </span>
                        <span className="text-muted text-decoration-line-through small">
                          ₹{(product?.price || 0)}
                        </span>
                      </div>
                      <span className="text-success fw-bold small">
                        50% OFF
                      </span>

                      <div className="mb-1 text-muted small">
                          Size: <span className="fw-semibold text-dark">{item.size || "-"}</span>
                      </div>

                      <div className="mb-4">
                          <p className="fw-semibold mb-2">Qty: </p>
                            <div className="input-group" style={{width: "110px"}}>
                              <button className="btn btn-outline-secondary" onClick={() => handleQtyChange(item, item.quantity - 1)}>-</button>
                              <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                              <button className="btn btn-outline-secondary" onClick={() => handleQtyChange(item, item.quantity + 1)}>+</button>
                            </div>
                        </div>
          
                    <div className="d-grid gap-2 mt-auto">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleRemove(item)}
                      >
                        Remove From Cart
                      </button>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => moveToWishlist(item)}
                      >
                        Move to Wishlist 🤍
                      </button>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-lg-5 col-md-10">
          <div className="card shadow-sm p-4 border-0 sticky-top" style={{top: "90px"}}>
            <h5 className="fw-bold text-uppercase mb-3">Price Details</h5>
            <hr />
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
              <span>₹{deliveryCharge}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total Amount</span>
              <span>₹{total}</span>
            </div>

            <p className="text-success small mt-2">
              You will save ₹{discount} on this order 🎉
            </p>

            <button className="btn btn-primary w-100 fw-bold mt-3" onClick={() => navigate('/address')}>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
