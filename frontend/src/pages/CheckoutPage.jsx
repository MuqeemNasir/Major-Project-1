import { useNavigate } from "react-router-dom"
import { useAddressContext } from "../contexts/AddressContext"
import { useCartContext } from "../contexts/CartContext"
import { apiPlaceOrder } from "../services/orderAPI"
import { toast } from "react-toastify"
import { FaMapMarkerAlt, FaTruck, FaMoneyBillWave, FaShieldAlt } from "react-icons/fa"

export default function CheckoutPage() {
  const { cart, clearCart } = useCartContext()
  const { selectedAddress } = useAddressContext()
  const navigate = useNavigate()

  const address = selectedAddress

  // Calculation Logic
  const calculateDiscountPrice = (price, qty) => Math.floor(price * qty * 0.5)
  
  const price = cart.reduce(
    (t, i) => t + (i.product?.price || 0) * i.quantity,
    0
  )
  
  const discount = cart.reduce(
    (t, i) => t + calculateDiscountPrice(i.product.price || 0, i.quantity || 0),
    0
  )

  const delivery = 499;
  const total = price - discount + delivery

  const placeOrder = async() => {
    if(!address){
      toast.error("Please select a delivery address")
      navigate('/address')
      return
    } 

    // Map cart items to backend expectation
    const items = cart.map((it) => ({
        product: it.product._id || it.product,
        quantity: it.quantity,
        size: it.size || null
    }))
    
    // Construct Payload
    // Note: userId is handled by backend default/token extraction if not sent
    const payload = {
        shippingAddressId: address._id,
        items,
        total,
    }

    try{
        const res = await apiPlaceOrder(payload)
        // Handle various response structures
        const orderId = res?.order?._id || res?.orderId || res?.data?.order?._id || null

        if(orderId){
          await clearCart()
          toast.success("Order Placed Successfully!")          
          navigate(`/order-success/${orderId}`)
        }else{
          throw new Error("Order ID missing from API response")
        }

    }catch(error){
        console.error("Failed to place order: ", error)
        toast.error("Failed to place order. Please try again.")
    }
  }

  // Handle Empty Cart
  if(cart.length === 0){
    return (
        <div className="container text-center py-5">
            <div className="mb-4">
                <FaTruck size={50} className="text-muted opacity-50"/>
            </div>
            <h3 className="fw-bold text-muted">Your Cart is Empty</h3>
            <p>Add some paintings to your cart to checkout.</p>
            <button className="btn btn-primary mt-3 px-4" onClick={() => navigate(`/products`)}>Shop Now</button>
        </div>
    )
  }

  return (
    <div className="container py-4 mb-5">
      <h3 className="fw-bold mb-4 text-center">Checkout</h3>
      
      <div className="row g-4">
        {/* LEFT COLUMN: Address & Items */}
        <div className="col-lg-7 col-md-12">
          
          {/* 1. Shipping Address Card */}
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white py-3 border-bottom">
              <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                <FaMapMarkerAlt className="text-primary"/> Shipping Address
              </h5>
            </div>
            <div className="card-body">
              {address ? (
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="fw-bold text-uppercase badge bg-light text-dark border mb-2">
                        {address.label || "Home"}
                    </h6>
                    <h5 className="fw-bold mb-1">{address.name}</h5>
                    <p className="text-muted mb-1">{address.line1}, {address.line2}</p>
                    <p className="text-muted mb-1">
                        {address.city}, {address.state} - <strong>{address.postalCode}</strong>
                    </p>
                    <p className="mb-0 text-muted small"><strong>Phone: </strong>{address.phone}</p>
                  </div>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/address`)}>
                    Change
                  </button>
                </div>
              ) : (
                <div className="text-center py-3">
                  <p className="text-muted mb-2">No delivery address selected.</p> 
                  <button className="btn btn-primary btn-sm" onClick={() => navigate(`/address`)}>
                    + Select Address
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* 2. Order Items Card */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 border-bottom">
              <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                <FaTruck className="text-primary" /> Order Items <span className="text-muted small">({cart.length})</span>
              </h5>
            </div>
            
            <div className="card-body p-0">
                {cart.map((it, idx) => {
                    const itemPrice = calculateDiscountPrice(it.product?.price || 0, it.quantity);
                    const originalPrice = (it.product?.price || 0) * it.quantity;

                    return (
                        <div key={it._id || idx} className={`d-flex gap-3 p-3 ${idx !== cart.length - 1 ? "border-bottom" : ""}`}>
                            <div style={{width: "100px", height: "100px", flexShrink: 0}}>
                                <img
                                    src={it.product?.imageUrls?.[0] || it.product?.image || "/placeholder.jpg"}
                                    alt={it.product?.name}
                                    className="rounded border"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            
                            <div className="flex-grow-1">
                                <h6 className="fw-bold mb-1">{it.product?.name}</h6>
                                <p className="text-muted small mb-1">Size: {it.size || "Standard"}</p>
                                <p className="text-muted small mb-0">Qty: {it.quantity}</p>
                            </div>
                            
                            <div className="text-end">
                                <div className="fw-bold">₹{itemPrice}</div>
                                {discount > 0 && (
                                    <div className="text-muted text-decoration-line-through small">₹{originalPrice}</div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Price Summary */}
        <div className="col-lg-5 col-md-12">
          <div className="card shadow-sm border-0 position-sticky" style={{top: "90px"}}>
            <div className="card-header bg-white py-3 border-bottom">
                 <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                    <FaMoneyBillWave className="text-success"/> Price Details
                 </h5>
            </div>
            <div className="card-body">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Price ({cart.length} items)</span>
                  <span>₹{price}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Discount</span>
                  <span className="text-success">- ₹{discount}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Delivery Charges</span>
                  <span>₹{delivery}</span>
                </div>
                
                <hr className="my-3"/>
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fw-bold fs-5">Total Amount</span>
                  <span className="fw-bold fs-4">₹{total}</span>
                </div>

                <button
                  className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                  onClick={placeOrder}
                  disabled={!address || cart.length === 0}
                >
                  Confirm Order
                </button>

                <div className="mt-3 text-center text-muted small d-flex align-items-center justify-content-center gap-1">
                    <FaShieldAlt /> Safe and Secure Payments.
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}