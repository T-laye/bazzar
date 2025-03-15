import { toast } from 'sonner';
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
  addItems: (items: CartItem[]) => void;
  addItem: (item: { product: string; name: string; unit_price: number; quantity: number; picture: string }) => void;
  removeItem: (product: string) => void;
  updateQuantity: (product: string, newQuantity: number) => void;
  clearCart: () => void;
  loadCart: () => CartItem[];
  saveCart: () => void;
}

const CART_STORAGE_KEY = 'bazzar_cart';

export const cartStore = create<CartState>((set) => ({
  items: [],
  totalPrice: 0,

  addItems: (items) => {
    set((state) => {
      const updatedItems = [...state.items];

      items.forEach((item) => {
        const existingItem = updatedItems.find((i) => i.product === item.product);
        if (existingItem) {
          existingItem.quantity += item.quantity;
          existingItem.total_price = existingItem.quantity * existingItem.unit_price;
        } else {
          updatedItems.push({ ...item, total_price: item.unit_price * item.quantity });
        }
      });

      const newTotalPrice = updatedItems.reduce((sum, i) => sum + i.total_price, 0);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));

      return { items: updatedItems, totalPrice: newTotalPrice };
    });
  },

  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.product === item.product);
      let updatedItems;

      if (existingItem) {
        toast.error(`Item exists in cart already`);
        return { items: state.items, totalPrice: state.totalPrice }; // Fix here
      } else {
        updatedItems = [...state.items, { ...item, total_price: item.unit_price * item.quantity }];
        toast.success(`Item added to cart`);
      }

      const newTotalPrice = updatedItems?.reduce((sum, i) => sum + i.total_price, 0);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));

      return { items: updatedItems, totalPrice: newTotalPrice };
    });
  },


  removeItem: (product) => {
    set((state) => {
      const filteredItems = state.items.filter((item) => item.product !== product);
      const newTotalPrice = filteredItems.reduce((sum, item) => sum + item.total_price, 0);

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filteredItems));

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

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));

      return { items: updatedItems, totalPrice: newTotalPrice };
    });
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ items: [], totalPrice: 0 });
  },

  loadCart: () => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      console.log(savedCart);
      if (!savedCart) return;

      const parsedCart = JSON.parse(savedCart);
      console.log(parsedCart)
      const totalPrice = parsedCart.reduce((sum: number, item: CartItem) => sum + item.total_price, 0);
      set({ items: parsedCart, totalPrice });
      return parsedCart
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