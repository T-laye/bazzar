"use client";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { X, CreditCard, MapPin, Truck, CheckCircle, AlertCircle, Plus, ChevronDown } from 'lucide-react';
import { AppContext, IContext } from '@/providers/Context';
import { useSessionStore } from '@/store/SessionStore';
import { CartItem } from '@/store/cartStore';
import { IUserAddress } from '@/types';

const CheckoutModal = ({ isOpen, onClose, cartItems }:{isOpen:boolean,onClose:(data:boolean)=>void, cartItems:CartItem[]}) => {
  const { session } = useSessionStore();
  const { setCartItems } = useContext(AppContext) as IContext;
  const [currentStep, setCurrentStep] = useState(1);
  const [savedAddresses, setSavedAddresses] = useState<IUserAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    city: '', state: '', zip_code: '', country: '', street: ''
  });
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '', cardHolder: '', expiryDate: '', cvv: ''
  });
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [addressDropdownOpen, setAddressDropdownOpen] = useState(false);
  
  const modalRef = useRef(null);
  const dropdownRef = useRef(null);

  // Calculate totals
  const subtotal = React.useMemo(() => 
    cartItems.reduce((total:number, item:CartItem) => total + (item?.unit_price * item.quantity), 0), [cartItems]
  );
  
  const shippingCost = deliveryOption === 'express' ? 3000 : deliveryOption === 'next-day' ? 5000 : 1500;
  const totalPrice = subtotal + shippingCost;

  // Initialize addresses from user data
  useEffect(() => {
    if (session?.user?.address?.length) {
      setSavedAddresses(session.user.address );
      const defaultAddress = session.user.address.find(addr => addr.default_address) || session.user.address[0];
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress?._id as string);
        setShippingAddress(defaultAddress);
      }
    } else {
      setShowAddressForm(true);
    }
  }, [session]);

  // Handle various click events outside elements
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
    
      if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
        setAddressDropdownOpen(false);
      }
    
      if (isOpen && modalRef.current && target && !modalRef.current.contains(target)) {
        onClose(false);
      }
    };
    
    
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Control body scroll
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle address selection
  const handleAddressSelect = (addressId:string) => {
    const selected = savedAddresses.find(addr => addr._id === addressId);
    if (selected) {
      setSelectedAddressId(addressId);
      setShippingAddress(selected);
      setErrors(prev => {
        const newErrors = { ...prev };
        ['fullName', 'address', 'city', 'state', 'zipCode', 'phone'].forEach(key => delete newErrors[key]);
        return newErrors;
      });
    }
    setAddressDropdownOpen(false);
  };

  // Handle input changes
  function handleInputChange<T>(
    e: React.ChangeEvent<HTMLInputElement>, 
    stateSetter: React.Dispatch<React.SetStateAction<T>>,
    errors: Record<string, string>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>
  ) {
    const { name, value } = e.target;
    stateSetter(prev => ({ ...prev, [name]: value }));
  
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }
  
  

  // Format card number
  const formatCardNumber = (input:string) => {
    const digitsOnly = input.replace(/\D/g, '');
    const groups = [];
    for (let i = 0; i < digitsOnly.length; i += 4) {
      groups.push(digitsOnly.substring(i, i + 4));
    }
    return groups.join(' ');
  };

  // Validate current step
  const validateCurrentStep = () => {
    const newErrors:Record<string,string> = {};
    
    if (currentStep === 1) {
      if (!selectedAddressId && showAddressForm) {
        for (const field of ['country', 'state', 'city', 'street', 'zip_code', 'phone']) {
          if (!shippingAddress[field as keyof typeof shippingAddress]) {
            newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
          }
        }
      } else if (!selectedAddressId && !showAddressForm) {
        newErrors.country = 'Please select an address or add a new one';
      }
    } else if (currentStep === 2) {
      if (!paymentMethod.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (paymentMethod.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      if (!paymentMethod.cardHolder) {
        newErrors.cardHolder = 'Card holder name is required';
      }
      
      if (!paymentMethod.expiryDate) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
        newErrors.expiryDate = 'Use MM/YY format';
      }
      
      if (!paymentMethod.cvv) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(paymentMethod.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation and submission
  const handleNextStep = () => validateCurrentStep() && setCurrentStep(prev => prev + 1);
  const handlePrevStep = () => setCurrentStep(prev => prev - 1);
  
  const handleSubmitOrder = async () => {
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCartItems([]);
        setOrderComplete(true);
      } catch (error) {
        console.error('Failed to complete order:', error);
        setErrors({ submit: 'Failed to complete your order. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (!isOpen) return null;

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-base md:text-lg font-medium mb-3">Shipping Address</h3>
            
            {savedAddresses.length > 0 && (
              <div className="mb-4 relative" ref={dropdownRef}>
                <div 
                  className="flex justify-between items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={() => setAddressDropdownOpen(!addressDropdownOpen)}
                >
                  {selectedAddressId ? (
                    <div className="flex-1">
                      <p className="font-medium text-sm">{shippingAddress.country}</p>
                      <p className="text-xs text-gray-600">{shippingAddress.state}, {shippingAddress.city}</p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-600">Select a saved address</span>
                  )}
                  <ChevronDown size={16} className={`transition-transform ${addressDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {addressDropdownOpen && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10">
                    {savedAddresses.map((addr) => (
                      <div 
                        key={addr._id}
                        className={`p-2 hover:bg-gray-50 cursor-pointer ${addr._id === selectedAddressId ? 'bg-red-50' : ''}`}
                        onClick={() => handleAddressSelect(addr._id as string)}
                      >
                        <p className="font-medium text-sm">
                          {addr.country} {addr.default_address && <span className="text-xs text-red-800">(Default)</span>}
                        </p>
                        <p className="text-xs text-gray-600">{addr.country}, {addr.city}, {addr.state}</p>
                      </div>
                    ))}
                    <div 
                      className="p-2 hover:bg-gray-50 cursor-pointer border-t flex items-center text-red-800"
                      onClick={() => {
                        setShowAddressForm(true);
                        setSelectedAddressId('');
                        setShippingAddress({country: '', street: '', city: '', state: '', zip_code: ''});
                        setAddressDropdownOpen(false);
                      }}
                    >
                      <Plus size={16} className="mr-1" /><span className="text-sm">Add new address</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {(showAddressForm || savedAddresses.length === 0) && (
              <>
                {savedAddresses.length > 0 && (
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium">{selectedAddressId ? 'Edit Address' : 'New Address'}</h4>
                    {!selectedAddressId && savedAddresses.length > 0 && (
                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          const defaultAddress = savedAddresses.find(addr => addr.default_address) || savedAddresses[0];
                          if (defaultAddress) {
                            setSelectedAddressId(defaultAddress._id);
                            setShippingAddress(defaultAddress);
                          }
                        }}
                        className="text-xs text-red-800 hover:text-red-700"
                      >Cancel</button>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['city','state','zip_code','country','street'].map(field => (
                    <div key={field} className={field === 'fullName' || field === 'address' ? 'col-span-2' : ''}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                      </label>
                      <input 
                        type={field === 'phone' ? 'tel' : 'text'}
                        name={field}
                        // value={shippingAddress[field as keyof typeof shippingAddress] || ''}
                        onChange={(e) =>handleInputChange(e, setShippingAddress,errors,setErrors)}
                        className={`w-full p-2 text-slate-800 border rounded-md text-sm ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={field === 'phone' ? '+234 800 123 4567' : ''}
                      />
                      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        );
        
      case 2:
        return (
          <div>
            <h3 className="text-base md:text-lg font-medium mb-3">Payment Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                <input 
                  type="text"
                  name="cardNumber"
                  value={paymentMethod.cardNumber}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    setPaymentMethod(prev => ({ ...prev, cardNumber: formatted }));
                    if (errors.cardNumber) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.cardNumber;
                        return newErrors;
                      });
                    }
                  }}
                  maxLength={19}
                  className={`w-full p-2 border text-slate-800 rounded-md text-sm ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="1234 5678 9012 3456"
                />
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Card Holder Name</label>
                <input 
                  type="text"
                  name="cardHolder"
                  value={paymentMethod.cardHolder}
                  onChange={(e) => handleInputChange(e, setPaymentMethod,errors,setErrors)}
                  className={`w-full p-2 border text-slate-800 rounded-md text-sm ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="John Doe"
                />
                {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="text"
                    name="expiryDate"
                    value={paymentMethod.expiryDate}
                    onChange={(e) => handleInputChange(e, setPaymentMethod,errors,setErrors)}
                    className={`w-full p-2 border text-slate-800 rounded-md text-sm ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
                  <input 
                    type="password"
                    name="cvv"
                    value={paymentMethod.cvv}
                    onChange={(e) => handleInputChange(e, setPaymentMethod,errors,setErrors)}
                    className={`w-full p-2 border text-slate-800 rounded-md text-sm ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div>
            <h3 className="text-base md:text-lg font-medium mb-3">Order Review</h3>
            
            {/* Shipping Details */}
            <div className="mb-3 p-2 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-sm">Shipping Address</h4>
                <button onClick={() => setCurrentStep(1)} className="text-xs text-red-800 hover:text-red-700">Edit</button>
              </div>
              <p className="text-xs text-gray-600">
                {shippingAddress.city}<br />
                {shippingAddress.state}<br />
                {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip_code}<br />
                {shippingAddress.country}
              </p>
            </div>
            
            {/* Payment Details */}
            <div className="mb-3 p-2 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium text-sm">Payment Method</h4>
                <button onClick={() => setCurrentStep(2)} className="text-xs text-red-800 hover:text-red-700">Edit</button>
              </div>
              <p className="text-xs text-gray-600">
                {paymentMethod.cardHolder}<br />
                **** **** **** {paymentMethod.cardNumber.slice(-4)}<br />
                Expires: {paymentMethod.expiryDate}
              </p>
            </div>
            
            {/* Delivery Options */}
            <div className="mb-3">
              <h4 className="font-medium mb-2 text-sm">Delivery Options</h4>
              <div className="space-y-2">
                {[
                  { value: 'standard', label: 'Standard Delivery', desc: '3-5 business days', cost: 1500 },
                  { value: 'express', label: 'Express Delivery', desc: '1-2 business days', cost: 3000 },
                  { value: 'next-day', label: 'Next Day Delivery', desc: 'Next business day', cost: 5000 }
                ].map(option => (
                  <label key={option.value} className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value={option.value}
                      checked={deliveryOption === option.value}
                      onChange={(e) => setDeliveryOption(e.target.value)}
                      className="mr-2 text-slate-800"
                    />
                    <div className="flex-1">
                      <span className="font-medium text-xs">{option.label}</span>
                      <p className="text-xs text-gray-600">{option.desc}</p>
                    </div>
                    <span className="font-medium text-xs">₦ {option.cost.toLocaleString()}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2 text-sm">Order Summary</h4>
              <div className="space-y-1 mb-3 text-slate-700">
                {cartItems.map((item:CartItem) => (
                  <div key={item.product} className="flex justify-between">
                    <span className="text-xs text-gray-600">{item.name} x {item.quantity}</span>
                    <span className="text-xs font-medium">₦ {(item.unit_price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-2 space-y-1">
                <div className="flex justify-between">
                  <span className="text-xs">Subtotal</span>
                  <span className="text-xs font-medium text-red-500">₦ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs">Shipping</span>
                  <span className="text-xs font-medium text-red-500">₦ {shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-bold text-red-800 text-sm">₦ {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {errors.submit && (
              <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700">{errors.submit}</p>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity flex items-center justify-center">
      <div ref={modalRef} className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl m-4">
        <div className="p-3 border-b flex justify-between items-center bg-red-800 text-white rounded-t-lg">
          <h2 className="text-lg font-bold text-slate-800">{orderComplete ? 'Order Completed' : 'Checkout'}</h2>
          <button onClick={() => onClose(false)} className="p-1 rounded-full text-slate-800 hover:bg-red-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {orderComplete ? (
          <div className="p-4 text-center">
            <div className="flex justify-center mb-4"><CheckCircle size={48} className="text-green-500" /></div>
            <h3 className="text-xl font-bold mb-2">Thank You for Your Order!</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Your order has been received and is being processed.
              You will receive a confirmation email shortly.
            </p>
            <p className="font-medium mb-4">Order Total: ₦ {totalPrice.toLocaleString()}</p>
            <button 
              onClick={() => onClose(false)}
              className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
            >Continue Shopping</button>
          </div>
        ) : (
          <div className="p-3">
            {/* Progress Indicators */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                {[
                  { step: 1, icon: <MapPin size={12} />, label: "Shipping" },
                  { step: 2, icon: <CreditCard size={12} />, label: "Payment" },
                  { step: 3, icon: <Truck size={12} />, label: "Review" }
                ].map((item, index, arr) => (
                  <React.Fragment key={item.step}>
                    <div className={`flex flex-col items-center ${currentStep >= item.step ? 'text-red-800' : 'text-gray-400'}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${currentStep >= item.step ? 'border-red-800 bg-red-100' : 'border-gray-300'}`}>
                        {item.icon}
                      </div>
                      <span className="text-xs mt-1">{item.label}</span>
                    </div>
                    {index < arr.length - 1 && (
                      <div className="flex-1 h-1 mx-1 bg-gray-200">
                        <div className={`h-full bg-red-800 transition-all ${currentStep > item.step ? 'w-full' : 'w-0'}`}></div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-4">{renderStepContent()}</div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {currentStep > 1 ? (
                <button 
                  onClick={handlePrevStep}
                  className="px-3 py-2 text-sm border border-gray-300 text-slate-800 rounded-md hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >Back</button>
              ) : (
                <button 
                  onClick={() => onClose(false)}
                  className="px-3 py-2 text-sm border text-slate-800 border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >Cancel</button>
              )}
              
              {currentStep < 3 ? (
                <button 
                  onClick={handleNextStep}
                  className="px-4 py-2 text-sm  bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                >Continue</button>
              ) : (
                <button 
                  onClick={handleSubmitOrder}
                  className="px-4 py-2 text-sm bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium flex items-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Processing</span>
                      <div className="w-4 h-4 border-2 border-white  border-t-transparent rounded-full animate-spin"></div>
                    </>
                  ) : 'Complete Order'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;