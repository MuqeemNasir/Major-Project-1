import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { apiGetProductsById } from "../services/productAPI"
import { useCartContext } from "../contexts/CartContext"
import { useWishlistContext } from "../contexts/WishlistContext"
import { FiCreditCard, FiLock, FiRefreshCcw, FiTruck } from "react-icons/fi"
import RelatedProducts from "../components/Products/RelatedProducts"
import { toast } from "react-toastify";
import { useLoadingContext } from "../contexts/LoadingContext"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { addToCart, cart } = useCartContext() 
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistContext()
  const { setIsLoading } = useLoadingContext()

  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(null)

  const isWishlisted = wishlist?.some(w => String(w.productId || w._id) === String(id))
  const isInCart = cart?.some(item => String(item.product._id || item.product) === String(id) && (item.size || "") === (size || ""))

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    setIsLoading(true)
    try {
      const res = await apiGetProductsById(id)
      const prod = res?.data?.data?.product || res?.data?.product || res?.product || res
      setProduct({
        ...prod,
        image: prod.image || prod.imageUrls?.[0] || "",
        rating: Number(prod.rating ?? 0),
        price: Number(prod.price ?? 0),
        sizes: prod.sizes || [],
      });

      if (prod?.sizes?.length === 1) setSize(prod.sizes[0])
      else setSize("")
    } catch (error) {
      console.log("Single product fetch error: ", error)
    }finally{
      setIsLoading(false)
    }
  };

  const handleAddToCart = async () => {
    if (product.sizes?.length > 0 && !size) {
      toast.error("Please select a size!")
      return
    }

    if (isInCart) {
      navigate("/cart")
      return
    }

    try {
      await addToCart(product._id, quantity, size || "");
      toast.success("Added to cart!")
    } catch (err) {
       console.error("Add to cart failed: ", err)
      toast.error("Failed to add to cart")
    }
  }

  const handleBuyNow = async() => {
    if (product.sizes?.length > 0 && !size) {
        toast.error("Please select a size!")
        return
    }
    try{
      await addToCart(product._id, quantity, size || "")
      navigate("/cart")
    }catch(error){
      console.error("Buy Now failed: ", err)
      toast.error("Failed to Buy Now.")
    }
  }

  const handleWishlist = async () => {
    try {
      if (isWishlisted) {
        await removeFromWishlist({ productId: id })
        toast.info("Removed from Wishlist")
      } else {
        await addToWishlist({ productId: id })
        toast.success("Added to Wishlist")
      }
    } catch (err) {
      console.error("Wishlist error: ", err)
      toast.error("Wishlist action failed")
    }
  }

  if (!product) return null

  return (
    <div className="container-fluid container-md py-3 py-md-2">
      <div className="row g-3 g-md-5">
        <div className="col-12 col-md-6">
          <div className="position-relative bg-light rounded shadow-sm d-flex align-items-center justify-content-center">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded shadow-sm w-100"
              style={{ objectFit: "cover", width: "100%", height: "auto", maxHeight: "500px", minHeight: "300px", backgroundColor: "#f8f9fa" }}
            />
            <button
              onClick={handleWishlist}
              className="position-absolute top-0 end-0 m-3 btn btn-light rounded-circle shadow p-2 d-flex align-items-center justify-content-center"
              style={{width: "45px", height: "45px", border: "1px solid #eee"}}
              title={isWishlisted ? "Removed from Wishlist" : "Add to Wishlist"}
            >
              <span className="fs-5">{isWishlisted ? "❤️" : "🤍"}</span>
            </button>
          </div>
          <div className="mt-4 d-none d-md-flex gap-3">
            <button onClick={handleBuyNow} className="btn btn-primary flex-grow-1 py-3 fw-bold shadow-sm">Buy Now</button>
            <button className={`btn ${isInCart ? 'btn-success' : 'btn-dark'} flex-grow-1 py-3 fw-bold shadow-sm`} onClick={handleAddToCart}>
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>

        <div className="col-12 col-md-6 pb-5 pb-md-0">
          <h2 className="fw-bold mb-1 fs-3 fs-md-2">{product.name}</h2>
          <p className="text-muted small mb-2">{product.category?.name || "Art"}</p>
          
          <div className="d-flex align-items-center mb-3">
            <span className="badge bg-warning text-dark me-2 px-2 py-1">{product.rating} ★</span>
            <span className="text-muted small">{product.numReviews || 0} Reviews</span>
          </div>

          <div className="mb-4 ">
             <h3 className="fw-bold text-dark">₹{product.price / 2} <span className="text-muted fs-6 text-decoration-line-through fw-normal ms-2">₹{product.price}</span> <span className="text-success fs-6 ms-2">(50% OFF)</span></h3>
             <p className="text-success small fw-bold">inclusive of all taxes</p>
          </div>

        {product.sizes?.length > 0 && (
          <div className="mb-4">
            <p className="fw-semibold mb-2">Select Size:</p>
            <div className="d-flex gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`btn px-3 ${size === s ? "btn-dark" : "btn-outline-secondary"}`}>
                    {s}
                  </button>
                ))}
            </div>
          </div>
        )}

          <div className="mb-4">
            <p className="fw-semibold mb-2">Quantity: </p>
             <div className="input-group" style={{width: "110px"}}>
                <button className="btn btn-outline-secondary" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <input type="text" className="form-control text-center" value={quantity} readOnly />
                <button className="btn btn-outline-secondary" onClick={() => setQuantity(q => q + 1)}>+</button>
             </div>
          </div>
          <hr/>
          <div className="row g-2 mt-2">
            <div className="col-3 text-center"><FiTruck className="mb-1" size={20}/><br/><small style={{fontSize: '0.7rem'}}>Free Delivery</small></div>
            <div className="col-3 text-center"><FiRefreshCcw className="mb-1" size={20}/><br/><small style={{fontSize: '0.7rem'}}>Returns</small></div>
            <div className="col-3 text-center"><FiLock className="mb-1" size={20}/><br/><small style={{fontSize: '0.7rem'}}>Secure</small></div>
            <div className="col-3 text-center"><FiCreditCard className="mb-1" size={20}/><br/><small style={{fontSize: '0.7rem'}}>Pay on Delivery</small></div>
          </div>
          <hr />

          {/* //for mobile screen */}
          <div className="mt-4 small">
            <h5 className="fw-bold pb-2">Product Details:</h5>
            <div className="row mt-3 g-2 ">
              <div className="col-6"><small className="text-muted">Artist</small><p className="fw-semibold">
                {product.artist || "N/A"}</p>
              </div>
              <div className="col-6"><small className="text-muted">Medium</small><p className="fw-semibold">
                {product.medium || "Canvas / Digital"}</p>
              </div>
              <div className="col-6"><small className="text-muted">Weight</small><p className="fw-semibold">
                {product.weight || "Lightweight"}</p>
              </div>
              <div className="col-6"><small className="text-muted">Availability</small><p className="fw-semibold">
                {product.availability || "In Stock"}</p>
              </div>
              <div className="col-6"><small className="text-muted">Year</small><p className="fw-semibold">
                {product.year || "2022"}</p>
              </div>
              <div>
              <p className="text-muted mt-2 small">{product.description}</p>
              </div>
            </div>
          </div>

          <div className="d-md-none fixed-bottom bg-white shadow-lg p-3 border-top d-flex gap-2" style={{zIndex: 1000}}>
            <button className="btn btn-primary flex-grow-1 fw-bold" onClick={handleBuyNow}>Buy Now</button>
            <button className={`btn ${isInCart ? 'btn-success' : 'btn-dark'} flex-grow-1 fw-bold`} onClick={handleAddToCart}>{isInCart ? "Go to Cart" : "Add to Cart"}</button>
          </div>
        </div>
      </div>
      <hr />
      <RelatedProducts currentProductId={product._id} />
    </div>
  );
};

export default ProductDetail;