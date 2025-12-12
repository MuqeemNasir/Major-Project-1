import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { apiGetAllProducts } from "../../services/productAPI"
import { useCartContext } from "../../contexts/CartContext"
import { useWishlistContext } from "../../contexts/WishlistContext"
import { toast } from "react-toastify"

const RelatedProducts = ({ currentProductId }) => {
  const [random, setRandom] = useState([])
  const { addToCart } = useCartContext()
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistContext()

  useEffect(() => {
    fetchProducts()
  }, [currentProductId])

  const fetchProducts = async () => {
    try {
      const res = await apiGetAllProducts()
      const data = res?.product || res?.data?.product || res?.data || res || []

      const filtered = data.filter((p) => p._id !== currentProductId)
      const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 4)

      setRandom(shuffled)
    } catch (err) {
      console.log("Random products fetch error", err)
    }
  }

  const handleAddToCart = async (product) => {
    try {
      const defaultSize =
        product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
      await addToCart(product._id, 1, defaultSize)
      toast.success("Add to Cart!")
    } catch (error) {
      console.error(error)
      toast.error("Failed to add to cart")
    }
  }

  const handleWishlist = async (e, productId, isWishlisted) => {
    e.stopPropagation()
    e.preventDefault()

    try {
      if (isWishlisted) {
        await removeFromWishlist({ productId })
        toast.info("Removed from Wishlist")
      } else {
        await addToWishlist({ productId })
        toast.success("Added to Wishlist")
      }
    } catch (err) {
      console.error("Wishlist error: ", err)
      toast.error("Wishlist action failed")
    }
  }

  return (
    <div className="mt-5 mb-5">
      <h4 className="fw-bold mb-4 border-bottom pb-2">You Might Also Like</h4>
      <div className="row g-3 g-md-4">
        {random.map((p) => {
          const isWishlisted = wishlist?.some(
            (w) => String(w.productId || w._id) === String(p._id)
          )
          return (
            <div className="col-6 col-md-3" key={p._id}>
              <div className="card h-100 border-0 shadow-sm product-card-hover">
                <div className="position-relative bg-light rounded-top">
                  <Link
                    to={`/product/${p._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <img
                      src={p.image || p.imageUrls?.[0]}
                      className="card-img-top"
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                  <button
                    onClick={(e)=> handleWishlist(e, p._id, isWishlisted)}
                    className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center border-0"
                    style={{width:"35px", height:"35px", zIndex: 10}}
                    title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <span style={{fontSize: "1.2rem", lineHeight: 5}}>{isWishlisted ? "❤️" : "🤍"}</span>
                  </button>
                </div>
                <div className="card-body d-flex flex-column p-3">
                  <h6 className="card-title text-truncate fw-semibold mb-1">
                    <Link to={`/product/${p._id}`} className="text-decoration-none text-dark">{p.name}</Link>
                  </h6>
                  <p className="card-text fw-bold text-dark mb-3">₹{p.price}</p>
                  <button
                    className="btn btn-outline-dark btn-sm w-100 mt-auto fw-semibold"
                    onClick={() => handleAddToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RelatedProducts;
