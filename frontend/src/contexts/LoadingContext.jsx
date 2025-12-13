import { createContext, useContext, useState } from "react";
import GlobalSpinner from "../components/GlobalSpinner";

const LoadingContext = createContext()
export const useLoadingContext = () => useContext(LoadingContext)

export const LoadingProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)

    return(
        <LoadingContext.Provider value={{isLoading, setIsLoading}}>
            {isLoading && <GlobalSpinner />}
            {children}
        </LoadingContext.Provider>
    )
}