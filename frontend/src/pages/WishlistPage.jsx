import { Link } from "react-router-dom"
import { useCartContext } from "../contexts/CartContext"
import { useWishlistContext } from "../contexts/WishlistContext"

const WishlistPage = () => {
  const { addToCart } = useCartContext()
  const { wishlist, removeFromWishlist } = useWishlistContext()

  return (
    <div className="container py-4">
      <h5 className="fw-bold mb-4 text-center">My Wishlist ❤️</h5>

      {wishlist.length === 0 ? (
        <p className="text-muted">Your wishlist is empty.</p>
      ) : (
        <div className="row g-4">
          {wishlist.map((item) => {
            const p = item.product || item // Depending on stored structure

            return (
              <div className="col-md-3" key={p._id}>
                <div className="shadow-sm p-2 text-center position-relative">
                    <button
                    className="position-absolute top-0 end-0 btn-light fs-4 border-0 rounded-circle bg-transparent shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      removeFromWishlist({ productId: p._id })
                    }}
                  >
                    ❤️
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
                      await addToCart(p._id, 1, null)
                      removeFromWishlist({productId: p._id})
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
