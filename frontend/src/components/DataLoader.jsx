import { useEffect } from "react"
import { useCartContext } from "../contexts/CartContext"
import { useLoadingContext } from "../contexts/LoadingContext"
import { useWishlistContext } from "../contexts/WishlistContext"
import { useAddressContext } from "../contexts/AddressContext"

const DataLoader = () =>{
    const {loading: cartLoading} = useCartContext()
    const {loading: wishlistLoading} = useWishlistContext()
    const {loading: addressLoading} = useAddressContext()
    const {setIsLoading} = useLoadingContext()

    useEffect(() => {
    if(cartLoading || wishlistLoading || addressLoading){
      setIsLoading(true)
    }else{
      const timer = setTimeout(() => setIsLoading(false), 200)
      return () => clearTimeout(timer)
    }
  }, [cartLoading, wishlistLoading, addressLoading, setIsLoading])
  return null
}

export default DataLoader