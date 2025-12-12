import {Link, useNavigate, useLocation} from 'react-router-dom'
import {FaHeart, FaSearch, FaShoppingCart, FaUser} from "react-icons/fa"
import { useState, useEffect } from 'react'
import { useWishlistContext } from "../contexts/WishlistContext"
import { useCartContext } from '../contexts/CartContext'
import UserProfile from './UserProfile'
import logoImage from '../assets/icons8-artist-stickers-32.png'

export default function Navbar(){
    const navigate = useNavigate()
    const location = useLocation()
    const {wishlist} = useWishlistContext()
    const {cart} = useCartContext()
    const [query, setQuery] = useState("")
    const [panelOpen, setPanelOpen] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState(false)

    useEffect(() => {
        if(location.pathname === "/products"){
            const params = new URLSearchParams(location.search)
            setQuery(params.get("search") || "")
        }else{
            setQuery("")
        }
        setIsNavOpen(false)
    }, [location])

    const onSearch = (e) => {
        const value = e.target.value
        setQuery(value)

        const querySearch = new URLSearchParams()
        if(value.trim() !== "") querySearch.set("search", value)
        navigate(`/products?${querySearch.toString()}`)
    }

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen)
    }

    return(
        <>
        <header className="bg-light text-dark sticky-top" style={{ zIndex: 1020 }}>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
                <div className="container">
                    <Link to="/" className="navbar-brand text-secondary fw-bold fs-4 d-flex align-items-center text-dark"> 
                        <img src={logoImage} alt="Artify Logo" style={{height: "30px", marginRight: "10px"}} />
                        <span>Artify</span>
                    </Link>
                    <button className="navbar-toggler border-0" type="button" onClick={toggleNav} aria-expanded={isNavOpen} aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
                    <form className="d-md-flex mx-auto w-100 w-lg-50 mt-3 mt-lg-0 position-relative" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" className="form-control rounded-pill ps-5" placeholder="Search paintings..." value={query} onChange={onSearch} aria-label="Search" />
                        <button className="btn position-absolute top-50 start-0 translate-middle-y rounded-circle me-1 text-secondary"><FaSearch size={15}/></button>
                    </form>
                    <div className="d-flex align-items-center justify-content-center justify-content-lg-end gap-4 gap-lg-5 mt-4 mt-lg-0">
                        <button className='btn btn-light rounded-5 p-2 d-flex align-items-center justify-content-center' data-bs-toggle="offcanvas" data-bs-target="#userDrawer" onClick={() => setPanelOpen(true)}><FaUser size={20}/><span className='d-none d-sm-inline'>Profile</span></button>
                        <Link to="/wishlist" className="position-relative text-dark nav-link p-1">
                            <FaHeart size={20} />
                            {wishlist?.length > 0 && (
                                <span className="badge bg-danger position-absolute top-1 start-100 translate-middle rounded-pill" style={{fontSize: "0.5rem"}}>{wishlist.length}</span>
                            )}
                        </Link>
                        <Link to="/cart" className="position-relative text-dark nav-link p-1">
                            <FaShoppingCart size={20} />
                            {cart?.length > 0 && (
                                <span className="badge bg-danger position-absolute top-1 start-100 translate-middle rounded-pill" style={{fontSize: "0.5rem"}}>{cart.length}</span>
                            )}
                            
                        </Link>
                    </div>
                </div>
                </div>
            </nav>
        </header>
        <UserProfile isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
        </>
    )
}