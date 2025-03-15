import { create } from 'zustand';

interface CartItem {
  product: string;
  name: string;
  unit_price: number;
  total_price: number;
  quantity: number;
  picture: string;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  addItem: (item: { product: string; name: string; unit_price: number; quantity: number; picture: string }) => void;
  removeItem: (product: string) => void;
  updateQuantity: (product: string, newQuantity: number) => void;
  clearCart: () => void;
  loadCart: ()=>void
}

export const cartStore = create<CartState>((set) => ({
  items: [],
  totalPrice: 0,

  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.product === item.product);

      if (existingItem) {
        // If item exists, update quantity and total price
        const updatedItems = state.items.map((i) =>
          i.product === item.product
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                total_price: (i.quantity + item.quantity) * i.unit_price,
              }
            : i
        );

        const newTotalPrice = updatedItems.reduce((sum, i) => sum + i.total_price, 0);
        localStorage.setItem('bazzar_cart', JSON.stringify(updatedItems));

        return { items: updatedItems, totalPrice: newTotalPrice };
        
      } else {
        // Add new item
        const newItem = {
          ...item,
          total_price: item.unit_price * item.quantity,
        };

        const newTotalPrice = state.totalPrice + newItem.total_price;

        return { items: [...state.items, newItem], totalPrice: newTotalPrice };
      }
    });
  },

  removeItem: (product) => {
    set((state) => {
      const filteredItems = state.items.filter((item) => item.product !== product);
      const newTotalPrice = filteredItems.reduce((sum, item) => sum + item.total_price, 0);

      return { items: filteredItems, totalPrice: newTotalPrice };
    });
  },

  updateQuantity: (product, newQuantity) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.product === product
          ? {
              ...item,
              quantity: newQuantity,
              total_price: newQuantity * item.unit_price,
            }
          : item
      );

      const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.total_price, 0);

      return { items: updatedItems, totalPrice: newTotalPrice };
    });
  },

  clearCart: () => set({ items: [], totalPrice: 0 }),
  loadCart: () => {
    const cartItems = JSON.parse(localStorage.getItem('bazzar_cart') || '[]');
    set((state) => ({ items: cartItems, totalPrice: cartItems.reduce((sum:number, item:CartItem) => sum + item.total_price, 0) }));
  },
}));
