import {Link, useNavigate, useLocation} from 'react-router-dom'
import {FaHeart, FaShoppingCart, FaUser} from "react-icons/fa"
import { useState, useEffect } from 'react'
import { useWishlistContext } from "../contexts/WishlistContext"
import { useCartContext } from '../contexts/CartContext'
import UserProfile from './UserProfile'

export default function Navbar(){
    const navigate = useNavigate()
    const location = useLocation()
    const {wishlist} = useWishlistContext()
    const {cart} = useCartContext()
    const [query, setQuery] = useState("")
    const [panelOpen, setPanelOpen] = useState(false)

    useEffect(() => {
        if(location.pathname === "/products"){
            const params = new URLSearchParams(location.search)
            setQuery(params.get("search") || "")
        }else{
            setQuery("")
        }
    }, [location])

    const onSearch = (e) => {
        const value = e.target.value
        setQuery(value)

        const querySearch = new URLSearchParams()
        if(value.trim() !== "") querySearch.set("search", value)
        navigate(`/products?${querySearch.toString()}`)
    }


    return(
        <>
        <header className="bg-light text-dark">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
                <div className="container">
                    <Link to="/" className="navbar-brand text-secondary fw-bold">Artify</Link>
                    <form className="d-none d-md-flex mx-auto" style={{width: "45%"}} onSubmit={(e) => e.preventDefault()}>
                        <input type="text" className="form-control rounded-pill px-3" placeholder="search" value={query} onChange={onSearch} aria-label="Search" />
                    </form>
                    <div className="d-flex align-items-center gap-5">
                        <button className='btn btn-outline-dark btn-sm' >Login</button>
                        <button className='btn btn-outline-dark btn-sm' data-bs-toggle="offcanvas" data-bs-target="#userDrawer"><FaUser /><span className='d-none d-sm-inline'>Profile</span></button>
                        {/* <Link to="/login" className="btn btn-outline-dark btn-sm">Login</Link> */}
                        <Link to="/wishlist" className="position-relative text-dark nav-link">
                            <FaHeart />
                            {wishlist?.length > 0 && (
                                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{wishlist.length}</span>
                            )}
                        </Link>
                        <Link to="/cart" className="position-relative text-dark nav-link">
                            <FaShoppingCart />
                            {cart?.length > 0 && (
                                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{cart.length}</span>
                            )}
                            
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
        <UserProfile isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
        </>
    )
}