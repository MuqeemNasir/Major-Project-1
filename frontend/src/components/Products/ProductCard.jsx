import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"


export default function ProductCard({product, onAddToCart, onAddToWishlist,onRemoveFromCart, onRemoveFromWishlist, isInCart = false, isInWishlist = false}) {
    const [cartAdded, setCartAdded] = useState(Boolean(isInCart))
    const [wishAdded, setWishAdded] = useState(Boolean(isInWishlist))
    const navigate = useNavigate()

    const goToProduct = () => navigate(`/product/${product._id}`)

    useEffect(() => {
        setCartAdded(Boolean(isInCart))
    }, [isInCart])

    useEffect(() => {
        setWishAdded(Boolean(isInWishlist))
    }, [isInWishlist])

    const toggleWishlist = () => {
        if(wishAdded){
            onRemoveFromWishlist?.()
            setWishAdded(false)
        }else{
            onAddToWishlist?.()
            setWishAdded(true)
        }
    }
    
    return(
        <div className="card shadow-sm h-100 w-100" >
            {/* <div className="position-absolute top-0 end-0 m-1 p-1 bg-transparent rounded-circle shadow-sm" style={{ zIndex: 5}} >
                <div style={{cursor: "pointer"}} onClick={toggleWishlist}>
                    <FaHeart color={wishAdded ? "red" : "grey"} size={18}/>
                </div>
            </div> */}
            <button onClick={toggleWishlist} className="position-absolute top-0 end-0  btn-light fs-4 border-0 rounded-circle bg-transparent shadow-sm">{wishAdded ? "❤️" : "🤍"}</button>
            <Link to={`/product/${product._id}`}>
                <img src={ product.image || product.imageUrls?.[0] || ""} alt={product.name} className="card-img-top" style={{height: "200px", objectFit: "cover"}} />
            </Link>
            <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title text-truncate">{product.name}</h5>
                <p className="card-text fw-bold mb-1">₹{product.price}</p>

                <div className="mb-2">
                    {Array.from({ length: 5}).map((_, idx) => (
                        <span key={idx} style={{ color: idx < Math.round(product.rating || 0) ? "#ffc107" : "#ddd"}}>★</span>
                    ))}
                </div>
                              
                <div className="d-grid gap-2 mt-auto">
                    {cartAdded ? (
                        <Link to="/cart" className="btn btn-primary btn-sm">Go to Cart</Link>
                    ) : (
                        <button className="btn btn-secondary btn-sm" onClick={goToProduct}>Add to Cart</button>
                    )}

                    {wishAdded ? (
                        <button className="btn btn-outline-secondary btn-sm" onClick={toggleWishlist}>Remove from Wishlist</button>
                    ) : (
                        <button className="btn btn-light btn-sm" onClick={toggleWishlist}>Save to Wishlist</button>
                    )}
                </div>
            </div>
        </div>
    )
}