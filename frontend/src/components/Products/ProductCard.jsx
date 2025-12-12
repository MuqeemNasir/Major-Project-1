import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function ProductCard({product, onAddToCart, onAddToWishlist, onRemoveFromWishlist, isInCart = false, isInWishlist = false}) {
    const [wishAdded, setWishAdded] = useState(Boolean(isInWishlist))
    const [cartAdded, setCartAdded] = useState(Boolean(isInCart))
    const navigate = useNavigate()

    useEffect(() => {
        setWishAdded(Boolean(isInWishlist))
    }, [isInWishlist])

    useEffect(() => {
        setCartAdded(Boolean(isInCart))
    }, [isInCart])

    const toggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(wishAdded){
            if(onRemoveFromWishlist){
                onRemoveFromWishlist?.()
                toast.info("Removed from Wishlist")
                setWishAdded(false)
            }  
        }else{
            if(onAddToWishlist){
                onAddToWishlist?.()
                toast.success("Added to Wishlist")
                setWishAdded(true)
            }   
        }
    }

    const handleCardClick = () => {
        navigate(`/product/${product._id}`)
    }

    const handleAddToCart = (e) => {
        e.preventDefault(); 
        e.stopPropagation();
        
        if(cartAdded){
            navigate("/cart")
        } else {
            const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
            if(onAddToCart){
                onAddToCart(product._id, 1, defaultSize)
                toast.success("Added to Cart")
                setCartAdded(true)
            }
        }
    }
    
    return(
        <div className="card shadow-sm h-100 w-100 border-0" onClick={handleCardClick} style={{cursor: "pointer", transition: "transform 0.2s"}}>
            <div className="position-relative bg-light rounded-top">
                 <img src={ product.image || product.imageUrls?.[0] || ""} alt={product.name} className="card-img-top" style={{height: "230px", objectFit: "cover", width: "100%"}} />
                 
                 <button onClick={toggleWishlist} className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center border-0" style={{width:"35px", height:"35px", zIndex: 10}} title={wishAdded ? "Remove from Wishlist" : "Add to Wishlist"}>
                    <span style={{fontSize: "1.2rem", lineHeight: 5}}>{wishAdded ? "❤️" : "🤍"}</span>
                 </button>
            </div>

            <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate fw-semibold mb-1" style={{fontSize: "1rem"}}>{product.name}</h5>
                <p className="card-text fw-bold mb-2">₹{product.price}</p>

                <div className="mb-3 small">
                    {Array.from({ length: 5}).map((_, idx) => (
                        <span key={idx} style={{ color: idx < Math.round(product.rating || 0) ? "#ffc107" : "#e4e5e9"}}>★</span>
                    ))}
                </div>
                              
            </div>
                <div className="mt-auto d-grid gap-2">
                    {cartAdded ? (
                        <button className="btn btn-outline-primary btn-sm fw-semibold" onClick={handleAddToCart}>
                            Go to Cart
                        </button>
                    ) : (
                        <button className="btn btn-secondary btn-sm fw-semibold" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    )}
                    {wishAdded ? (
                        <button className="btn btn-outline-secondary btn-sm" onClick={toggleWishlist}>Remove from Wishlist</button>
                    ) : (
                        <button className="btn btn-light btn-sm" onClick={toggleWishlist}>Save to Wishlist</button>
                    )}
                </div>
        </div>
    )
}