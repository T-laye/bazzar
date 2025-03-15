'use client'
import { CartItem } from "@/store/cartStore"
import { useContext,createContext,useState } from "react"

interface IContext{
    cartItems:CartItem[],
    setCartItems:(items:CartItem[]) => void
}
const AppContext = createContext<IContext>()


export const AppProvider = ({ children }) => {
    // define states
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    // create context value
    const contextValue:IContext = {
        cartItems,
        setCartItems
    }
    // return context provider
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}