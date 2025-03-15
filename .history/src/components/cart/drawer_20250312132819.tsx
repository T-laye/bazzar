"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { cartService } from '@/hooks/useCart';

// Cart Drawer Component
const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);

  // Sample cart items - replace with your actual cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Power Engine Drill", price: 300000, quantity: 1, image: "/images/product1.jpg" },
    { id: 2, name: "Calibration Tool Kit", price: 150000, quantity: 2, image: "/images/product2.jpg" }
  ]);

  const cart = cartService.fetchCartItems()

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle quantity changes
  const updateQuantity = (id:string, newQuantity:number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) && 
          !event.target.closest('.cart-toggle')) {
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
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-white text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
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
            {cartItems.length === 0 ? (
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
                  <li key={item.id} className="border rounded-lg p-3 flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        //   onError={(e) => {
                        //     e.target.onerror = null;
                        //     e.target.src = "/api/placeholder/100/100";
                        //   }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-red-800 font-bold">₦ {item.price.toLocaleString()}</p>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 border rounded-l-md hover:bg-gray-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 py-1 border-t border-b">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 border rounded-r-md hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                        <button 
                          onClick={() => removeItem(item.id)}
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
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total</span>
                <span className="font-bold">₦ {totalPrice.toLocaleString()}</span>
              </div>
              <button className="w-full py-3 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium">
                Proceed to Checkout
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
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