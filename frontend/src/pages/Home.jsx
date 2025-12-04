import { useEffect, useState } from "react";
import { apiGetAllProducts, apiGetCategories } from "../services/productAPI";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [randomCategories, setRandomCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const catRes = await apiGetCategories();
        setCategories(catRes);

        const shuffledCats = [...catRes].sort(() => 0.5 - Math.random());
        setRandomCategories(shuffledCats.slice(0, 4));

        const prodRes = await apiGetAllProducts();
        setProducts(prodRes);

        const shuffledProds = [...prodRes].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffledProds.slice(0, 8));

      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getCategoryImage = (categoryId) => {
    const product = products.find((p) => p.category === categoryId);
    return product && product.imageUrls?.length > 0
      ? product.imageUrls[0]
      : "https://placehold.co/300x180?text=No+Image";
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h3 className="fw-semibold mb-4">Featured Categories</h3>
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">Loading Categories...</p>
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {randomCategories.map((cat) => (
              <div
                className="col-md-3"
                key={cat._id}
                onClick={() => navigate(`/products?category=${cat._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="card border-0 shadow-sm rounded-3">
                  <img
                    src={getCategoryImage(cat._id)}
                    alt={cat.name}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{cat.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mb-5">
            <div id="homeCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {randomProducts.map((_, i) => (
                        <button key={i} type="button" data-bs-target="#homeCarousel" data-bs-slide-to={i} className={i === 0 ? "active" : ""}></button>
                    ))}
                </div>
                <div className="carousel-inner rounded-3 shadow-sm" style={{height: "350px"}}>
                    {randomProducts.map((prod, i) => (
                        <div key={prod._id} className={`carousel-item ${i === 0 ? "active" : ""}`} style={{cursor: "pointer"}} onClick={() => navigate(`/product/${prod._id}`)}>
                            <img src={prod.imageUrls[0]} alt={prod.name} className="d-block w-100" style={{height: "350px", objectFit: "cover"}} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="row g-4 mb-5">
            {randomProducts.map((prod) => (
                <div className="col-md-6" key={prod._id} onClick={() => navigate(`/product/${prod._id}`)} style={{cursor: "pointer"}}>
                    <div className="card border-0 shadow-sm rounded-3">
                        <img src={prod.imageUrls[0]} alt={prod.name} className="card-img-top" style={{height: "250px", objectFit: "cover"}} />
                        <div className="card-body">
                            <h5 className="card-title">{prod.name}</h5>
                            <p className="card-text fw-bold">₹{prod.price}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
