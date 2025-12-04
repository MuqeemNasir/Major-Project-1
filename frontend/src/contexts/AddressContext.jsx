import { createContext, useContext, useEffect, useState } from "react";
import { apiAddAddress, apiDeleteAddress, apiGetAddress, apiUpdateAddress } from "../services/addressAPI";

const AddressContext = createContext()
export const useAddressContext = () => useContext(AddressContext)

export const AddressProvider = ({children}) => {
    const USER_ID = import.meta.env.VITE_USER_ID || "demoUserId"
    const [addresses, setAddresses] = useState([])
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [loading, setLoading] = useState(false)

    const loadAddresses = async() => {
        setLoading(true)
        try{
            const res = await apiGetAddress(USER_ID)
            setAddresses(res || [])

            const defaultAddr = res?.find(a => a.isDefault)
            if(defaultAddr) setSelectedAddress(defaultAddr)
            return res
        }catch(error){
            console.error("Failed to load addresses")
            setAddresses([])
            throw error
        }finally{
            setLoading(false)
        }
    }

    const addAddress = async(data) => {
        setLoading(true)
        try{
            await apiAddAddress({userId: USER_ID, ...data})
            await loadAddresses()
        }catch(error){
            console.error("Failed to add address", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const updateAddress = async (id, data) => {
        setLoading(true)
        try{
            await apiUpdateAddress(id, data)
            await loadAddresses()
        }catch(error){
            console.error("Failed to update address", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    const deleteAddress = async(addressId) => {
        setLoading(true)
        try{
            await apiDeleteAddress(USER_ID, addressId)
            await loadAddresses()
        }catch(error){
            console.error("Failed to delete address", error)
            throw error
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAddresses()
    }, [])

    return(
        <AddressContext.Provider value={{addresses, selectedAddress, setSelectedAddress, loading, loadAddresses, addAddress, updateAddress, deleteAddress}}>
            {children}
        </AddressContext.Provider>
    )
}