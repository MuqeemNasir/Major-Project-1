import { useEffect } from "react";
import { FaCheckCircle, FaHistory, FaShoppingBag } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function OrderSuccess(){
    const {orderId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return(
        <div className="container d-flex justify-content-center align-items-center" style={{minHeight: "70vh"}}>
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 text-center" style={{maxWidth: "550px", width: "100%"}}>
                <div className="mb-4">
                    <FaCheckCircle className="text-success display-1" />
                </div>
                <h2 className="fw-bold mb-3 text-dark">Order Placed Successfully 🎉</h2>
                <p className="text-muted mb-4">Thank you for your purchase. We have received your order and are getting it ready for shipment.</p>
                <div className="bg-light p-3 rounded-3 border border-secondary border-opacity-25 mb-4 d-inline-block w-100">
                    <p className="mb-1 small text-uppercase fw-bold text-muted">Order ID</p>
                    <h5 className="mb-0 text-primary fw-bold text-break">{orderId}</h5>
                </div>

                <div className="d-grid gap-3 d-sm-flex justify-content-center">
                    <button onClick={() => navigate("/order-history")} className="btn btn-outline-dark px-4 py-2 d-flex align-items-center justify-content-center gap-2"><FaHistory />View Order</button>
                    <button onClick={() => navigate("/products")} className="btn btn-primary px-4 py-2 d-flex align-items-center justify-content-center gap-2"><FaShoppingBag />Continue Shopping</button>
                </div>

                <div className="mt-4 pt-3 border-top">
                    <p className="small text-muted mb-0">Need help? <Link to="#" className="text-decoration-none">Contact Support</Link></p>
                </div>
            </div>
        </div>
    )
}
