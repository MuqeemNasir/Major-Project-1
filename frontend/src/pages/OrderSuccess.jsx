import { useParams } from "react-router-dom";

export default function OrderSuccess(){
    const {orderId} = useParams()

    return(
        <div className="container py-5 text-center">
            <h2>Order Placed Successfully 🎉</h2>
            <p>Order ID: {orderId}</p>
        </div>
    )
}
