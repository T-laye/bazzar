'use client'
import { CartItem } from "@/store/cartStore"
import React,{ useContext,createContext,useState } from "react"

interface IContext{
    cartItems:CartItem[],
    setCartItems:(items:CartItem[]) => void
}
const AppContext = createContext<IContext | undefined>(undefined)


export const AppProvider = ({ children }:{children:React.ReactNode}) => {
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

