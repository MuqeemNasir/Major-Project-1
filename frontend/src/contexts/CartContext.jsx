import { createContext, useContext, useEffect, useState } from "react";
import { apiAddToCart, apiClearCart, apiGetCart, apiRemoveFromCart, apiUpdateCart } from "../services/cartAPI";

const CartContext = createContext()
export const useCartContext = () => useContext(CartContext)

export const CartProvider = ({children}) => {
    const USER_ID = import.meta.env.VITE_USER_ID || "demoUserId"
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(false)

    const loadCart = async() => {
        setLoading(true)
        try{
            const res = await apiGetCart(USER_ID)
            // setCart(res?.data?.data?.cart.items || [])
            const items = res?.data?.data?.cart?.items ?? []
            setCart(items)
            return res
        }catch(error){
            console.error("Failed to load cart", error)
            setCart([])
            throw error
        }finally{
            setLoading(false)
        }
    }

    const addToCart = async(productId, quantity = 1, size = "") => {
        setLoading(true)
        try{
            if (!productId) throw new Error("productId required");
            await apiAddToCart({userId: USER_ID, productId, quantity, size})
            await loadCart()
        }catch(error){
            console.error("Failed to add to cart", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const updateCart = async(productId, quantity, size = "") => {
        setLoading(true)
        try{
            if(!productId || typeof quantity === "undefined"){
                throw new Error("productId and quantity required")
            }
            await apiUpdateCart({userId: USER_ID, productId, quantity, size})
            await loadCart()
        }catch(error){
            console.error("Failed to update cart", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const removeItemFromCart = async(productId, size = "") => {
        setLoading(true)
        try{
            await apiRemoveFromCart(USER_ID, productId, size)
            await loadCart()
        }catch(error){
            console.error("Failed to remove item from cart", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const clearCart = async() => {
        setLoading(true)
        try{
            await apiClearCart(USER_ID)
            await loadCart()
        }catch(error){
            console.error("Failed to clear the cart", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        loadCart()
    }, [])

    return(
        <CartContext.Provider value={{cart, loading, loadCart, addToCart, updateCart, removeItemFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

