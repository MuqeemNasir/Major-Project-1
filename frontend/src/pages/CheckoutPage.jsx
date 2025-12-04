import { useNavigate } from "react-router-dom";
import { useAddressContext } from "../contexts/AddressContext";
import { useCartContext } from "../contexts/CartContext";
import { apiPlaceOrder } from "../services/orderAPI";

const USER_ID = import.meta.env.VITE_USER_ID;

export default function CheckoutPage() {
  const { cart } = useCartContext();
  const { selectedAddress } = useAddressContext();
  const navigate = useNavigate();

  const address = selectedAddress;

  const calculateDiscountPrice = (price, qty) => Math.floor(price * qty * 0.5);
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

  const placeOrder = async() => {
    if(!address) return alert ("Please choose an address please.")

    const items = cart.map((it) => ({
        product: it.product._id || it.product,
        quantity: it.quantity,
        size: it.size || null
    }))
    
    const payload = {
        userId: USER_ID,
        shippingAddressId: address._id,
        items,
        total,
    }

    try{
        const res = await apiPlaceOrder(payload)

        const orderId = res?.order?._id || res?.orderId || res?.data?.order?._id || null;

        if(!orderId) throw new Error("Order ID missing from API response")

        navigate(`/order-success/${orderId}`)
    }catch(error){
        console.error("Failed to place order: ", error)
        alert("Failed to place order. Try again.")
    }
  }

  return (
    <div className="container py-4">
      <h3>Checkout/Summary</h3>
      <div className="row">
        <div className="col-md-7">
          <h5>Shipping</h5>
          {address ? (
            <div className="card p-3">
              <div>
                <strong>{address.name}</strong>
              </div>
              <div>
                {address.line1}, {address.line2}
              </div>
              <div>
                {address.city}, {address.state}, {address.postalCode}
              </div>
              <div>{address.phone}</div>
            </div>
          ) : (
            <p className="text-muted">
              No address selected. Go back and choose one.
            </p>
          )}

          <hr />

          <h5>Items</h5>
          {cart.map((it) => (
            <div className="d-flex gap-3 align-items-center mb-2" key={it._id}>
              <img
                src={
                  it.product?.imageUrls?.[0] ||
                  it.product?.image ||
                  "/placeholder.jpg"
                }
                alt={it.product?.name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div>
                <div>{it.product?.name}</div>
                <small>Size: {it.size || "-"}</small>
                <div>Qty: {it.quantity}</div>
              </div>
              <div className="ms-auto">
                ₹{(it.product?.price || 0) * it.quantity}
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-5">
          <div className="card p-3">
            <h5>Summary</h5>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <b>₹{price}</b>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Discount</span>
              <b className="text-success">-₹{discount}</b>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Delivery</span>
              <b>₹{delivery}</b>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span>Total</span>
              <b>₹{total}</b>
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={placeOrder}
              disabled={!address}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
