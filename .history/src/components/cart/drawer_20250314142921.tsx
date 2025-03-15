"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { cartService } from '@/hooks/useCart';
import { CartItem } from '@/store/cartStore';
import { useSessionStore } from '@/store/SessionStore';

// Types
interface CartDrawerProps {
  // You can add props here if needed
}

const CartDrawer: React.FC<CartDrawerProps> = () => {
    const { session } = useSessionStore();
    const user = session?.user;
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Calculate total price - memoize this calculation to avoid recalculating on every render
  const totalPrice = React.useMemo(() => 
    cartItems.reduce((total, item) => total + (item?.unit_price * item.quantity), 0),
    [cartItems]
  );

  // Fetch cart items
  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const items = cartService.loadCart();
      setCartItems(items);
      // console.log(items)
    } catch (error) {
      // console.error("Failed to fetch cart items:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load cart items on component mount
  useEffect(() => {
    // if(user){
      fetchCart();
    // }
  }, [fetchCart,user,CartItem.getState().items]);

  // Handle quantity changes - use useCallback to avoid recreating this function on every render
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product === id ? { ...item, quantity: newQuantity } : item
      )
    );
    
    // Here you might want to also update the cart in your backend/service
    // cartService.updateItemQuantity(id, newQuantity);
  }, []);

  // Remove item from cart - use useCallback to avoid recreating this function on every render
  const removeItem = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product !== id));
    
    // Here you might want to also remove the item in your backend/service
    cartService.removeItemFromCart(id);
  }, []);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current && 
        !drawerRef.current.contains(event.target as Node) && 
        !(event.target as Element).closest('.cart-toggle')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Calculate total items in cart
  const totalItems =
   cartItems.length
   



  return (
    <>
      {/* Cart Icon Button */}
      <div className="relative">
        <button 
          onClick={() => setIsOpen(true)} 
          className="cart-toggle p-2 text-white bg-red-800 hover:bg-red-900 rounded-full flex items-center justify-center transition-colors"
          aria-label="Open cart"
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" />
      )}

      {/* Cart Drawer */}
      <div 
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full bg-white w-full sm:w-96 z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center bg-red-800 text-white">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-1 rounded-full hover:bg-red-700 transition-colors"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-40">
                <p>Loading cart...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingCart size={64} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.product} className="border rounded-lg p-3 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.picture ? (
                        <img 
                          src={item.picture} 
                          alt={item.name || 'Product'} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name || 'Unnamed Product'}</h3>
                      <p className="text-red-800 font-bold">₦ {item.unit_price.toLocaleString()}</p>
                      <div className="flex items-center mt-2 text-red-500">
                        <button 
                          onClick={() => updateQuantity(item.product, item.quantity - 1)}
                          className="p-1 border rounded-l-md hover:bg-gray-100"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 border-t border-b">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product, item.quantity + 1)}
                          className="p-1 border rounded-r-md hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => removeItem(item.product)}
                          className="ml-auto p-1 text-gray-500 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer with total and checkout button */}
          {cartItems.length > 0 && (
            <div className="border-t p-4 bg-gray-50">
              <div className="flex justify-between mb-4 text-red-500">
                <span className="font-medium">Total</span>
                <span className="font-bold ">₦ {totalPrice.toLocaleString()}</span>
              </div>
              <button 
                className="w-full py-3 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                onClick={() => {
                  // Handle checkout logic
                  console.log('Proceeding to checkout with items:', cartItems);
                }}
              >
                Proceed to Checkout
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 py-2 border border-gray-300 rounded-md text-red-500 hover:bg-gray-100 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;