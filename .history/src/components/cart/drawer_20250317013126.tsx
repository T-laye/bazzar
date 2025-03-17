"use client";
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { cartService } from '@/hooks/useCart';
import { CartItem } from '@/store/cartStore';
import { useSessionStore } from '@/store/SessionStore';
import { AppContext, AppProvider, IContext } from '@/providers/Context';
import CheckoutModal from './checkout';

// Types
interface CartDrawerProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen: controlledIsOpen, onOpenChange }) => {
  const { session } = useSessionStore();
  const user = session?.user;
  const context = useContext(AppContext) as IContext;
  
  const { cartItems, setCartItems } = context;

  // Use controlled or uncontrolled state based on whether props are provided
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const [openCheckout, setOpenCheckout] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  
  // Track if we're on mobile with useState to prevent hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if we're on client-side
    if (typeof window !== 'undefined') {
      // Set initial value
      setIsMobile(window.innerWidth < 640);
      
      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Handle state changes, respecting controlled component pattern
  const handleToggleDrawer = useCallback((newState: boolean) => {
    setInternalIsOpen(newState);
    if (onOpenChange) {
      onOpenChange(newState);
    }
  }, [onOpenChange]);

  // Calculate total price
  const totalPrice = React.useMemo(() => 
    cartItems?.reduce((total, item) => total + (item?.unit_price * item.quantity), 0),
    [cartItems]
  );

  // Fetch cart items
  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      const items = cartService.loadCart();
      setCartItems(items);
    } catch (error) {
      console.error('Failed to fetch cart items:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setCartItems]);
  
  // Load cart items on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Handle quantity changes
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.product === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [setCartItems]);

  // Remove item from cart
  const removeItem = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product !== id));
    cartService.removeItemFromCart(id);
  }, [setCartItems]);

  // Close drawer when clicking outside - only on desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isMobile &&
        drawerRef.current && 
        !drawerRef.current.contains(event.target as Node) && 
        !(event.target as Element).closest('.cart-toggle')
      ) {
        handleToggleDrawer(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleToggleDrawer, isMobile]);

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
  const totalItems = cartItems?.length || 0;

  return (
    <>
      {/* Cart Icon Button */}
      <div className="relative">
        <button 
          onClick={() => handleToggleDrawer(true)} 
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

      {/* Cart Modal/Drawer - Different positioning for mobile vs desktop */}
      {isOpen && (
        <>
          {/* Overlay - full screen on all devices */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity" />
          
          {/* Cart Container */}
          <div 
            ref={drawerRef}
            className={`fixed z-50 bg-white transform transition-transform duration-300 ease-in-out
              ${isMobile
                ? 'inset-0' // Full screen on mobile
                : 'top-0 right-0 h-full w-96' // Drawer on desktop
              }
              ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center bg-red-800 text-white">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button 
                  onClick={() => handleToggleDrawer(false)} 
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
                ) : cartItems?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <ShoppingCart size={64} className="mb-4 opacity-50" />
                    <p className="text-lg font-medium">Your cart is empty</p>
                    <button 
                      onClick={() => handleToggleDrawer(false)} 
                      className="mt-4 px-4 py-2 bg-red-800 text-white rounded hover:bg-red-700 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cartItems?.map((item) => (
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
                          <h3 className="font-medium text-slate-800">{item.name || 'Unnamed Product'}</h3>
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
              {cartItems?.length > 0 && (
                <div className="border-t p-4 bg-gray-50">
                  <div className="flex justify-between mb-4 text-red-500">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">₦ {totalPrice.toLocaleString()}</span>
                  </div>
                  <button 
                    className="w-full py-3 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                    onClick={() => {
                      setOpenCheckout(true);
                      console.log('Proceeding to checkout with items:', cartItems);
                    }}
                  >
                    Proceed to Payment
                  </button>
                  <button 
                    onClick={() => handleToggleDrawer(false)}
                    className="w-full mt-2 py-2 border border-gray-300 rounded-md text-red-500 hover:bg-gray-100 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}

              {/* checkout */}
              <CheckoutModal isOpen={openCheckout} onClose={setOpenCheckout} cartItems={cartItems} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDrawer;