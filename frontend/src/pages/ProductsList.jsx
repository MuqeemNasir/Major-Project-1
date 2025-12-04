import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiGetAllProducts, apiGetCategories } from "../services/productAPI";
import Filters from "../components/Filters/Filters";
import ProductCard from "../components/Products/ProductCard";
import { useCartContext } from "../contexts/CartContext";
import { useWishlistContext } from "../contexts/WishlistContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: [],
    rating: null,
    minPrice: 0,
    maxPrice: 20000,
    sort: "",
  });

  const { cart, addToCart, removeItemFromCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const [searchParams] = useSearchParams();
  const categoryFromURL = searchParams.get("category");
  const searchQuery = searchParams.get("search")?.toLowerCase() || ""

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const productRes = await apiGetAllProducts();

      const normalized = (productRes || []).map((p) => {
        let ratingValue = Number(p.rating ?? 0);

        let img = Array.isArray(p.imageUrls)
          ? p.imageUrls[0]
          : p.imageUrls || "";

        return {
          ...p,
          rating: ratingValue,
          price: Number(p.price ?? 0),
          category:
            typeof p.category === "object" ? p.category._id : p.category,
          image: img,
        };
      });

      setAllProducts(normalized);
      setProducts(normalized);

      const categoryRes = await apiGetCategories();
      setCategories(categoryRes || []);

      if (categoryFromURL) {
        setFilters((prev) => ({ ...prev, category: [categoryFromURL] }));
      }
    } catch (error) {
      console.error("Server error in fetch data: ", error);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, allProducts, searchQuery]);

  const applyFilters = async () => {
    let filtered = [...allProducts];

    if(searchQuery){
      filtered = filtered.filter((p) => {
        const text = `${p.name} ${p.artist} ${p.description} ${p.tags?.join(" ")}`.toLowerCase()
        return text.includes(searchQuery)
      })
    }

    if (Array.isArray(filters.category) && filters.category.length > 0) {
      filtered = filtered.filter((p) =>
        filters.category.includes(String(p.category))
      );
    }

    if (filters.rating !== null && !isNaN(filters.rating)) {
      filtered = filtered.filter((p) => {
        return Number(p.rating) >= Number(filters.rating);
      });
    }

    filtered = filtered.filter(
      (p) =>
        Number(p.price) >= Number(filters.minPrice) &&
        Number(p.price) <= Number(filters.maxPrice)
    );

    if (filters.sort === "low-high") {
      filtered = [...filtered].sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (filters.sort === "high-low") {
      filtered = [...filtered].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    // console.group("Filter Debug");
    // console.log(
    //   "Filters rating: ",
    //   filters.rating,
    //   "type: ",
    //   typeof filters.rating
    // );
    // console.log(
    //   "All product ratings: ",
    //   allProducts.map((p) => p.rating)
    // );
    // console.log("Filtered count: ", filtered.length);
    // console.log("Filtered sample: ", filtered.slice(0, 5));
    // console.groupEnd();

    setProducts(filtered);
  };

  const safeAddToCart = (id) => addToCart && addToCart(id, 1);
  const safeRemoveFromCart = (id) =>
    removeItemFromCart && removeItemFromCart(id);
  const safeAddToWishlist = (id) =>
    addToWishlist && addToWishlist({ productId: id });
  const safeRemoveFromWishlist = (id) =>
    removeFromWishlist && removeFromWishlist({ productId: id });

  const clearFilters = () => {
    setFilters({
      category: [],
      rating: null,
      minPrice: 0,
      maxPrice: 20000,
      sort: "",
    });
  };

  return (
    <div className="mt-4">
      <div className="row">
        <div className="col-md-3">
          <Filters
            categories={categories}
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />
        </div>

        <div className="col-md-9">
          <h6 className="fw-semibold mb-3">
            Showing All Products{" "}
            <span className="text-muted small">
              ( {products.length} products)
            </span>
          </h6>

          <div className="row g-4">
            {products.length > 0 ? (
              products.map((item) => (
                <div key={item._id} className="col-md-4 d-flex">
                  <ProductCard
                    product={item}
                    onAddToCart={() => safeAddToCart(item._id)}
                    onRemoveFromCart={() => safeRemoveFromCart(item._id)}
                    onAddToWishlist={() => safeAddToWishlist(item._id)}
                    onRemoveFromWishlist={() =>
                      safeRemoveFromWishlist(item._id)
                    }
                    isInCart={cart?.some(
                      (ci) =>
                        String(ci.productId || ci._id || ci.product) ===
                        String(item._id)
                    )}
                    isInWishlist={wishlist?.some(
                      (w) =>
                        String(w.productId || w._id || w) === String(item._id)
                    )}
                  />
                </div>
              ))
            ) : (
              <div className="col-12">
                <p className="text-muted">
                  No products match the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
