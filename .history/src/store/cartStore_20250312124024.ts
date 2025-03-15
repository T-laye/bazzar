import {create} from 'zustand'

interface cartState{
    items: Array<{product: string, name: string, unit_price: number, total_price:number, quantity: number,picture:string}>,
    totalPrice: number,
    addItem: (item: {id: number, name: string, price: number, quantity: number}) => void,
    removeItem: (itemId: number) => void,
    updateQuantity: (itemId: number, newQuantity: number) => void
}

export const cartStore = create<cartState>((set)=>({
    items:[],
    totalPrice: 0,
    addItem: (item) => {

    },
    removeItem: (itemId) => {
        
    }
}))