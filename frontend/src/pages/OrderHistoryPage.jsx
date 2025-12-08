import { useEffect, useState } from "react"
import { apiGetUser } from "../services/userApi"
import { apiGetOrders } from "../services/orderAPI"

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [userId, setUserId] = useState(null)


    useEffect(() => {
        const loadUser = async() => {
            try{
                const res = await apiGetUser()
                const user = res?.data?.data?.existingUser

                if(user && user._id){
                    setUserId(user._id)
                }else{
                    setError("User not found.")
                }
            }catch(err){
                console.error("Failed to load user: ", err)
                setError("Failed to load user.")
            }
        }
        loadUser()
    }, [])

    useEffect(() => {
        if(!userId) return
        
        const fetchOrders = async() => {
            try{
                const res = await apiGetOrders()
                setOrders(res?.data?.orders || [])
            }catch(err){
                console.error("Error fetching orders: ", err)
                setError("Failed to load orders.")
            }finally{
                setLoading(false)
            }
        }
        fetchOrders()
    }, [userId])

    if(loading) return <p className="text-center mt-4">Loading orders...</p>
    if(error) return <p className="text-danger text-center">{error}</p>

    if(orders.length === 0) return <h5 className="text-center mt-5">No Orders Found.</h5>

    return(
        <div className="container py-4">
            <h2 className="mb-4">Your Order History</h2>
            {orders.map((order => (
                <div className="card mb-4 shadow-sm" key={order._id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4 className="card-title">Order #{order._id}</h4>
                            <span className="badge bg-primary">{order.status}</span>
                        </div>
                        <small className="text-muted mb-2">Placed on: {new Date(order.createdAt).toLocaleString()}</small>
                        <hr />
                        {order.items.map((item, index) => {
                            const prod = item.product || {}
                            const prodImg = (Array.isArray(prod.imageUrls) && prod.imageUrls.length > 0 && prod.imageUrls[0]) || "https://placehold.co/70x70"

                            return(
                                <div className="d-flex align-items center mb-3" key={index}>
                                    <img src={prodImg} alt={prod.name || "Product"} width="70" height="70" className="rounded me-3" style={{objectFit: "cover"}} />
                                    <div>
                                        <p className="mb-1"><strong>{prod.name || "Unknown Product"}</strong></p>    
                                        <p className="mb-1 small">Qty: {item.quantity} {item.size && <> | Size: {item.size}</>}</p>
                                        <p className="mb-0 small text-muted">₹{item.priceAtPurchase} each</p>
                                    </div>                                    
                                </div>                                
                            )
                        })}
                        <hr />
                        <h5>Total Amount: ₹{order.totalAmount}</h5>
                        <hr />
                        <h6>Shipping Address</h6>
                        <p className="text-muted small mb-0">
                            {order.shippingAddress.name}<br/>
                            {order.shippingAddress.phone}<br/>
                            {order.shippingAddress.line1}, {order.shippingAddress.line2}<br/>
                            {order.shippingAddress.city}, {order.shippingAddress.state} - {" "}
                            {order.shippingAddress.postalCode}<br/>
                        </p>
                    </div>
                </div>                                
            )))}
        </div>
    )
}

export default OrderHistoryPage