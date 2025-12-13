import { useEffect, useState } from "react"
import { apiGetUser } from "../services/userApi"
import { apiGetOrders } from "../services/orderAPI"
import { FaCalendarAlt, FaMapMarkedAlt, FaMoneyBillWave } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useLoadingContext } from "../contexts/LoadingContext"

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([])
    const [error, setError] = useState(null)
    const [userId, setUserId] = useState(null)
    const { setIsLoading } = useLoadingContext()

    useEffect(() => {
        const loadUser = async() => {
            setIsLoading(true)
            try{
                const res = await apiGetUser()
                const user = res?.data?.data?.existingUser || res?.data?.user

                if(user && user._id){
                    setUserId(user._id)
                }else{
                    setError("User not found.")
                }
            }catch(err){
                console.error("Failed to load user: ", err)
                setError("Failed to load user.")
            }finally{
                setIsLoading(false)
            }
        }
        loadUser()
    }, [setIsLoading])

    useEffect(() => {
        if(!userId) return
        
        const fetchOrders = async() => {
            setIsLoading(true)
            try{
                const res = await apiGetOrders()
                setOrders(res?.data?.orders || [])
            }catch(err){
                console.error("Error fetching orders: ", err)
                setError("Failed to load orders.")
            }finally{
                setIsLoading(false)
            }
        }
        fetchOrders()
    }, [userId, setIsLoading])

    const getStatusBadge = (status) => {
        const s = status?.toLowerCase() || "pending"
        if(s === "delivered") return "bg-success"
        if(s === "cancelled") return "bg-danger"
        if(s === "shipped") return "bg-info text-dark"
        return "bg-warning text-dark"
    }

    if(error) return <p className="text-danger text-center">{error}</p>

    if(orders.length === 0) return <h5 className="text-center mt-5">No Orders Found.</h5>

    return(
        <div className="container py-4 mb-5">
            <h3 className="fw-bold mb-4 border-bottom pb-3">Your Order History
                 <span className="text-muted fs-6 fw-normal"> ({orders.length} orders)</span>
            </h3>
            <div className="row">
                <div className="col-12">
                    {orders.map((order => (
                        <div className="card mb-4 shadow-sm border-0 overflow-hidden rounded-3" key={order._id}>
                            <div className="card-header bg-light d-flex flex-wrap justify-content-between align-items-center py-3">
                                <div>
                                    <span className="fw-bold text-dark">Order #{order._id}</span>
                                    <div className="small text-muted d-flex align-items-center gap-2 mt-1"><FaCalendarAlt size={12} />{new Date(order.createdAt).toLocaleString()}</div>
                                </div>
                                <span className={`badge rounded-pill px-3 py-2 ${getStatusBadge(order.status)}`}>{order.status || "Pending"}</span>
                            </div>

                            <div className="card-body">
                                <div className="mb-4">
                                    {order.items.map((item, index) => {
                                        const prod = item.product || {}
                                        const prodImg = (Array.isArray(prod.imageUrls) && prod.imageUrls.length > 0 && prod.imageUrls[0]) || prod.image || "https://placehold.co/70x70?text=No+Img"

                                        return(
                                            <div className={`d-flex align-items-start gap-3 py-2 ${index !== order.items.length -1 ? "border-bottom" : ""}`} key={index}>
                                                <img src={prodImg} alt={prod.name || "Product"} className="rounded border" style={{width: "70px", height: "70px", objectFit: "cover", flexShrink: 0}} />
                                                <div className="flex-grow-1">
                                                    <Link to={`/product/${prod._id}`} className="text-decoration-none text-dark fw-semibold d-block text-truncate" style={{maxWidth: "90%"}}>{prod.name || "Unknown Product"}</Link>
                                                    <p className="mb-0 small text-muted">Qty: {item.quantity} {item.size && <span className="ms-2">| Size: {item.size}</span>}</p>
                                                    <p className="mb-0 fw-bold small mt-1">₹{item.priceAtPurchase}</p>
                                                </div>                                    
                                            </div>                                
                                        )
                                    })}
                                </div>

                                    <div className="bg-light bg-opacity-50 p-3 rounded">
                                        <div className="row g-3">
                                            <div className="col-md-6 border-end-md">
                                                <h6 className="fw-bold small text-uppercase text-muted mb-2">
                                                    <FaMapMarkedAlt className="me-1" /> Shipping To
                                                </h6>{order.shippingAddress ? (
                                                    <p className="mb-0 small text-secondary">
                                                        <strong>{order.shippingAddress.name}</strong><br />
                                                        {order.shippingAddress.line1}, {order.shippingAddress.line2 && <> 
                                                        {order.shippingAddress.line2}, </>}
                                                        {order.shippingAddress.city}, {order.shippingAddress.state} -
                                                        {order.shippingAddress.postalCode}<br/> 
                                                        Phone: {order.shippingAddress.phone}<br/>
                                                    </p>
                                                ) : (
                                                    <p className="small text-danger">Address info unavailable</p>
                                                )}
                                            </div>
                                            <div className="col-md-6 d-flex flex-column justify-content-center align-items-md-end">
                                                <h6 className="fw-bold small text-uppercase text-muted mb-2"><FaMoneyBillWave className="me-1" />Total Amount</h6>
                                                <h4 className="fw-bold text-success mb-0">₹{order.totalAmount}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                                
                    )))}
                </div>
            </div>
        </div>
    )
}

export default OrderHistoryPage