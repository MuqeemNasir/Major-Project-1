import { Link } from "react-router-dom"
import { useCartContext } from "../contexts/CartContext"
import { useWishlistContext } from "../contexts/WishlistContext"
import { FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"

const WishlistPage = () => {
  const { addToCart } = useCartContext()
  const { wishlist, removeFromWishlist } = useWishlistContext()

  return (
    <div className="container py-4 mb-5">
      <h2 className="fw-bold mb-4 text-center text-uppercase">My Wishlist  ❤️</h2>

      {wishlist.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">Your wishlist is empty.</p>
          <Link to="/products" className="btn btn-primary mt-2">Browse Art</Link>
        </div>
      ) : (
        <div className="row g-3 g-md-4">
          {wishlist.map((item) => {
            const p = item.product || item 

            return (
              <div className="col-6 col-md-4 col-lg-3" key={p._id}>
                <div className="shadow-sm p-3 text-center position-relative h-100 border-rounded">
                    <button
                    className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm"
                    style={{width: "35px", height: "35px"}}
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromWishlist({ productId: p._id })
                      toast.error("Removed from Wishlist")
                    }}
                  >
                    {/* ❤️ */}
                    <FaTrash color="red" size={14} /> 
                  </button>

                  <Link to={`/product/${p._id}`} className="text-decoration-none text-dark">
                    <img
                      src={p.image || p.imageUrls?.[0]}
                      alt={p.name}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                      className="rounded"
                    />
                    <h6 className="mt-2 text-truncate">{p.name}</h6>
                  </Link>
                  

                  <p className="fw-bold text-dark mb-2">₹{p.price}</p>

                  <button
                    className="btn btn-secondary btn-sm w-100 mb-2"
                    onClick={async() => {
                      const defaultSize = p.sizes && p.sizes.length > 0 ? p.sizes[0] : ""
                      await addToCart(p._id, 1, defaultSize)
                      removeFromWishlist({productId: p._id})
                      toast.success("Added to Cart")
                    }}
                  >
                    Move to Cart
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default WishlistPage
