import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AddressProvider } from "./contexts/AddressContext";
import { LoadingProvider } from "./contexts/LoadingContext";

import DataLoader from "./components/DataLoader";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductsList from "./pages/ProductsList";
import ProductDetail from "./pages/ProductDetail";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import AddressPage from "./pages/AddressPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <>
      <LoadingProvider>
        <CartProvider>
          <WishlistProvider>
            <AddressProvider>
              <Router>
                <DataLoader />
                <Navbar />
                  <main className="container py-4" style={{minHeight: "80vh"}}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductsList />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/address" element={<AddressPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route path="/order-success/:orderId" element={<OrderSuccess/>} />
                      <Route path="/order-history" element={<OrderHistoryPage/>} />
                    </Routes>
                  </main>
                  <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light"/>
              </Router>
            </AddressProvider>
          </WishlistProvider>
        </CartProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
