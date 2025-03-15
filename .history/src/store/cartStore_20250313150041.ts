import { create } from 'zustand';

export interface CartItem {
  product: string;
  name: string;
  unit_price: number;
  total_price: number;
  quantity: number;
  picture: string;
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  addItem: (item: { product: string; name: string; unit_price: number; quantity: number; picture: string }) => void;
  removeItem: (product: string) => void;
  updateQuantity: (product: string, newQuantity: number) => void;
  clearCart: () => void;
  loadCart: () => void;
  saveCart: () => void;
}

const CART_STORAGE_KEY = 'bazzar_cart';

export const cartStore = create<CartState>((set) => ({
  items: [],
  totalPrice: 0,

  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.product === item.product);

      let updatedItems;
      if (existingItem) {
        // Update quantity and total price if item exists
        updatedItems = state.items.map((i) =>
          i.product === item.product
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                total_price: (i.quantity + item.quantity) * i.unit_price,
              }
            : i
        );
      } else {
        // Add new item
        const newItem = {
          ...item,
          total_price: item.unit_price * item.quantity,
        };
        updatedItems = [...state.items, newItem];
      }

      const newTotalPrice = updatedItems.reduce((sum, i) => sum + i.total_price, 0);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));

      return { items: updatedItems, totalPrice: newTotalPrice };
    });

    cartStore.getState().saveCart();
  },

  removeItem: (product) => {
    set((state) => {
      const filteredItems = state.items.filter((item) => item.product !== product);
      const newTotalPrice = filteredItems.reduce((sum, item) => sum + item.total_price, 0);

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filteredItems));

      return { items: filteredItems, totalPrice: newTotalPrice };
    });

    cartStore.getState().saveCart();
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

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));

      return { items: updatedItems, totalPrice: newTotalPrice };
    });

    cartStore.getState().saveCart();
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ items: [], totalPrice: 0 });
  },

  loadCart: () => {
    try {
      const savedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
      const totalPrice = savedCart.reduce((sum: number, item: CartItem) => sum + item.total_price, 0);
      set({ items: savedCart, totalPrice });
    } catch (error) {
      console.error('Failed to load cart from local storage:', error);
      set({ items: [], totalPrice: 0 });
    }
  },

  saveCart: () => {
    const state = cartStore.getState();
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  },
}));
