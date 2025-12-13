import { useEffect, useState } from "react";
import { apiGetAllProducts, apiGetCategories } from "../services/productAPI";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useLoadingContext } from "../contexts/LoadingContext";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [randomCollections, setRandomCollections] = useState([]);
  const {setIsLoading} = useLoadingContext()
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          apiGetCategories(),
          apiGetAllProducts()
        ])

        setProducts(prodRes || []);

        const shuffledCats = (catRes || []).sort(() => 0.5 - Math.random());
        setCategories(shuffledCats.slice(0, 4));

        const shuffledProds = (prodRes || []).sort(() => 0.5 - Math.random());
        setRandomCollections(shuffledProds.slice(0, 2));

      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [setIsLoading]);

  const getCategoryImage = (categoryId) => {
    if(!products.length) return "https://placehold.co/300x180?text=Loading"

    const product = products.find((p) => {
      const pCatId = typeof p.category === 'object' ? p.category._id : p.category
      return pCatId === categoryId
    })

    return product && (product.imageUrls?.[0] || product.image) ? (product.imageUrls?.[0] || product.image) : "https://placehold.co/300x180?text=No+Image"
  };

  const images = [
    "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1578301978018-3005759f48f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", 
    "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
 ]

  return (
    <div className="container-fluid p-0 mb-5">
      <div className="container mt-4 mb-5">
        <div className="row g-3 mb-4">
            {categories.map((cat) => (
              <div
                className="col-6 col-md-3"
                key={cat._id}
                onClick={() => navigate(`/products?category=${cat._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="card border-0 shadow-sm overflow-hidden position-relative rounded-3">
                  <div style={{height: "120px", backgroundColor: "$f8f9fa"}}>
                  <img
                    src={getCategoryImage(cat._id)}
                    alt={cat.name}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  </div>
                  <div className="bg-white py-2 border-top text-center">
                    <h6 className="fw-bold text-uppercase m-0 small text-dark text-truncate px-2">{cat.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
            <div id="homeCarousel" className="carousel slide mb-5 rounded overflow-hidden shadow-sm" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active"></button>
                <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1"></button>
                <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2"></button>
                <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="3"></button>
                <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="4"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" style={{height: "50vh", minHeight: "350px"}}>
                  <img src={images[0]} alt="Abstract" className="d-block w-100 h-100" style={{objectFit: "cover", filter: "brightness(0.7)"}} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                    <h2 className="display-4 fw-bold text-uppercase">Abstract Art</h2>
                    <button className="btn btn-light fw-bold mt-3 px-4 rounded-0 text-uppercase" onClick={() => navigate(`/products`)}>Shop Now</button>
                  </div>
                </div>
                <div className="carousel-item" style={{height: "50vh", minHeight: "350px"}}>
                  <img src={images[1]} alt="Modern" className="d-block w-100 h-100" style={{objectFit: "cover", filter: "brightness(0.7)"}} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                    <h2 className="display-4 fw-bold text-uppercase">Modern Vibes</h2>
                    <button className="btn btn-outline-light fw-bold mt-3 px-4 rounded-0 text-uppercase" onClick={() => navigate(`/products`)}>Explore</button>
                  </div>
                </div>
                <div className="carousel-item" style={{height: "50vh", minHeight: "350px"}}>
                  <img src={images[2]} alt="Classic" className="d-block w-100 h-100" style={{objectFit: "cover", filter: "brightness(0.7)"}} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                    <h2 className="display-4 fw-bold text-uppercase">Timeless Classics</h2>
                    <button className="btn btn-primary fw-bold mt-3 px-4 rounded-0 text-uppercase" onClick={() => navigate(`/products`)}>View Collection</button>
                  </div>
                </div>
                <div className="carousel-item" style={{height: "50vh", minHeight: "350px"}}>
                  <img src={images[3]} alt="Colors" className="d-block w-100 h-100" style={{objectFit: "cover", filter: "brightness(0.7)"}} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                    <h2 className="display-4 fw-bold text-uppercase">Vibrant Colors</h2>
                    <button className="btn btn-outline-light fw-bold mt-3 px-4 rounded-0 text-uppercase" onClick={() => navigate(`/products`)}>Explore</button>
                  </div>
                </div>
                <div className="carousel-item" style={{height: "50vh", minHeight: "350px"}}>
                  <img src={images[4]} alt="Abstract" className="d-block w-100 h-100" style={{objectFit: "cover", filter: "brightness(0.7)"}} />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center h-100">
                    <h2 className="display-4 fw-bold text-uppercase">Abstract Art</h2>
                    <button className="btn btn-outline-light fw-bold mt-3 px-4 rounded-0 text-uppercase" onClick={() => navigate(`/products`)}>Explore</button>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
        <div className="row g-4 mb-5">
            {randomCollections.map((prod, index) => (
                <div className="col-md-6" key={prod._id}>
                    <div className="card border-0 bg-light h-100 overflow-hidden shadow-sm rounded-3">
                      <div className="row g-0 h-100 align-items-center">
                        <div className="col-5 h-100">
                          <img src={prod.imageUrls?.[0] || prod.image} alt={prod.name} className="img-fluid" style={{height: "100%", width: "100%", objectFit: "cover", minHeight: "220px"}} />
                        </div>
                        <div className="col-7">
                          <div className="p-4">
                            <small className="text-muted text-uppercase fw-bold 1s-1">{index === 0 ? "Artist's Choice": "New Arrival"}</small>
                            <h4 className="fw-bold my-2 text-truncate">{prod.name}</h4>
                            <p className="small text-muted mb-3 line-clamp-2">{prod.description ? prod.description.substring(0, 60) + "..." : "Explre this magnificent piece of art for your collection."}</p>
                            <button className="btn btn-link p-0 text-dark fw-bold text-decoration-none" onClick={() => navigate(`/product/${prod._id}`)}>View Painting <FaArrowRight size={12} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="bg-dark text-white rounded p-4 p-md-5 text-center mb-5">
          <h3 className="fw-bold">Join the Art Community</h3>
          <p className="lead text-white-50 small d-none d-sm-block">Get updates on new arrivals and exclusive offers directly to your inbox.</p>
          <div className="d-flex justify-content-center gap-2 mt-4 flex-wrap">
            <input type="email" placeholder="Your email address" className="form-control w-auto" style={{minWidth: "250px"}} />
            <button className="btn btn-primary fw-bold px-4">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
