import { createContext, useContext, useEffect, useState } from "react";
import { apiGetWishlist, apiAddToWishlist, apiRemoveFromWishlist } from "../services/wishlistAPI";

const WishlistContext = createContext()
export const useWishlistContext = () => useContext(WishlistContext)

export const WishlistProvider = ({children}) => {
    const [wishlist, setWishlist] = useState([])
    const [loading, setLoading] = useState(false)

    const loadWishlist = async() => {
        setLoading(true)
        try{
            const res = await apiGetWishlist()
            const wl = res?.data?.data?.wishlist
            // setWishlist(wl?.products ? wl.products : (wl || []))
            const products = wl?.products ? wl.products : (wl || [])
            setWishlist(products)
        }catch(error){
            console.error("Failed to load wishlist", error)
            setWishlist([])
        }finally{
            setLoading(false)
        }
    }

    const addToWishlist = async ({productId}) => {
        setLoading(true)
        try{
            const res = await apiAddToWishlist({productId})
            await loadWishlist()
            return res
        }catch(error){
            console.error("Failed to add to wishlist", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const removeFromWishlist = async({productId}) => {
        setLoading(true)
        try{
            const res = await apiRemoveFromWishlist(null, productId)
            await loadWishlist()
            return res
        }catch(error){
            console.error("Failed to remove from wishlist", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        loadWishlist()
    }, [])

    return(
        <WishlistContext.Provider value={{wishlist, loading, loadWishlist, addToWishlist, removeFromWishlist}}>
            {children}
        </WishlistContext.Provider>
    )
}

