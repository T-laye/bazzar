import {create} from 'zustand'

interface cartState{
    items: Array<{id: number, name: string, price: number, quantity: number}>,
    totalPrice: number,
    addItem: (item: {id: number, name: string, price: number, quantity: number}) => void,
    removeItem: (itemId: number) => void,
    updateQuantity: (itemId: number, newQuantity: number) => void
}