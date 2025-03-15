"use client";
import React, { useState, useRef, useEffect, useContext } from 'react';
import { X, CreditCard, MapPin, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { CartItem } from '@/store/cartStore';
import { AppContext, IContext } from '@/providers/Context';


interface CheckoutModalProps {
  isOpen: boolean;
  onClose: (data:boolean) => void;
  cartItems: CartItem[];
}

interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface PaymentMethod {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems }) => {
    const {setCartItems} = useContext(AppContext) as IContext
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  const [deliveryOption, setDeliveryOption] = useState<string>('standard');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Calculate total price
  const subtotal = React.useMemo(() => 
    cartItems.reduce((total, item) => total + (item?.unit_price * item.quantity), 0),
    [cartItems]
  );

  // Calculate shipping cost based on delivery option
  const getShippingCost = (): number => {
    switch (deliveryOption) {
      case 'express':
        return 3000;
      case 'next-day':
        return 5000;
      default: // standard
        return 1500;
    }
  };

  const shippingCost = getShippingCost();
  const totalPrice = subtotal + shippingCost;

  // Handle form input changes
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentMethod(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate current step before proceeding
  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      // Validate shipping address
      if (!shippingAddress.fullName) newErrors.fullName = 'Full name is required';
      if (!shippingAddress.address) newErrors.address = 'Address is required';
      if (!shippingAddress.city) newErrors.city = 'City is required';
      if (!shippingAddress.state) newErrors.state = 'State is required';
      if (!shippingAddress.zipCode) newErrors.zipCode = 'Zip code is required';
      if (!shippingAddress.phone) newErrors.phone = 'Phone number is required';
    } else if (currentStep === 2) {
      // Validate payment information
      if (!paymentMethod.cardNumber) newErrors.cardNumber = 'Card number is required';
      else if (paymentMethod.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      
      if (!paymentMethod.cardHolder) newErrors.cardHolder = 'Card holder name is required';
      
      if (!paymentMethod.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(paymentMethod.expiryDate)) {
        newErrors.expiryDate = 'Use MM/YY format';
      }
      
      if (!paymentMethod.cvv) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(paymentMethod.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Handle order submission
  const handleSubmitOrder = async () => {
    if (validateCurrentStep()) {
      setIsSubmitting(true);
      setCartItems([])
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Order completed successfully
        setOrderComplete(true);
        
        // Here you would typically call your order API
        // const response = await apiService.createOrder({
        //   items: cartItems,
        //   shippingAddress,
        //   paymentMethod: { ...paymentMethod, cvv: undefined }, // Don't send CVV to backend
        //   deliveryOption,
        //   totalAmount: totalPrice
        // });
        
      } catch (error) {
        console.error('Failed to complete order:', error);
        setErrors({ submit: 'Failed to complete your order. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current && 
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
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

  if (!isOpen) return null;

  // Format card number with spaces
  const formatCardNumber = (input: string): string => {
    const digitsOnly = input.replace(/\D/g, '');
    const groups = [];
    
    for (let i = 0; i < digitsOnly.length; i += 4) {
      groups.push(digitsOnly.substring(i, i + 4));
    }
    
    return groups.join(' ');
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity flex items-center justify-center">
        {/* Modal */}
        <div 
          ref={modalRef}
          className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl mx-4 my-2 md:m-4"
        >
          {/* Header */}
          <div className="p-3 md:p-4 border-b flex justify-between items-center bg-red-800 text-white rounded-t-lg">
            <h2 className="text-lg md:text-xl font-bold">
              {orderComplete ? 'Order Completed' : 'Checkout'}
            </h2>
            <button 
              onClick={()=>onClose(false)} 
              className="p-1 rounded-full hover:bg-red-700 transition-colors"
              aria-label="Close checkout"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          {orderComplete ? (
            /* Order Complete View */
            <div className="p-4 md:p-8 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle size={48} className="md:w-16 md:h-16 text-green-500" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Thank You for Your Order!</h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                Your order has been received and is being processed.
                You will receive a confirmation email shortly.
              </p>
              <p className="font-medium mb-4">Order Total: ₦ {totalPrice.toLocaleString()}</p>
              <button 
                onClick={()=>onClose(false)}
                className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Checkout Process */
            <div className="p-3 md:p-4">
              {/* Progress Indicators */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between">
                  <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-red-800' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-red-800 bg-red-100' : 'border-gray-300'}`}>
                      <MapPin size={12} className="md:w-4 md:h-4" />
                    </div>
                    <span className="text-xs mt-1">Shipping</span>
                  </div>
                  <div className="flex-1 h-1 mx-1 md:mx-2 bg-gray-200">
                    <div className={`h-full bg-red-800 transition-all ${currentStep >= 2 ? 'w-full' : 'w-0'}`}></div>
                  </div>
                  <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-red-800' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full text-slate-800 flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-red-800 bg-red-100' : 'border-gray-300'}`}>
                      <CreditCard size={12} className="md:w-4 md:h-4" />
                    </div>
                    <span className="text-xs mt-1">Payment</span>
                  </div>
                  <div className="flex-1 h-1 mx-1 md:mx-2 bg-gray-200">
                    <div className={`h-full bg-red-800 transition-all ${currentStep >= 3 ? 'w-full' : 'w-0'}`}></div>
                  </div>
                  <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-red-800' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-red-800 bg-red-100' : 'border-gray-300'}`}>
                      <Truck size={12} className="md:w-4 text-slate-800 md:h-4" />
                    </div>
                    <span className="text-xs mt-1">Review</span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="mb-4 md:mb-6">
                {currentStep === 1 && (
                  /* Shipping Address Form */
                  <div>
                    <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Shipping Address</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      <div className="col-span-2">
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                          type="text"
                          name="fullName"
                          value={shippingAddress.fullName}
                          onChange={handleShippingChange}
                          className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="John Doe"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input 
                          type="text"
                          name="address"
                          value={shippingAddress.address}
                          onChange={handleShippingChange}
                          className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="123 Main St"
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">City</label>
                        <input 
                          type="text"
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingChange}
                          className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Lagos"
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">State</label>
                        <input 
                          type="text"
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleShippingChange}
                          className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="Lagos State"
                        />
                        {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                        <input 
                          type="text"
                          name="zipCode"
                          value={shippingAddress.zipCode}
                          onChange={handleShippingChange}
                          className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="100001"
                        />
                        {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input 
                          type="tel"
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleShippingChange}
                          className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="+234 800 123 4567"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  /* Payment Method Form */
                  <div>
                    <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Payment Information</h3>
                    <div className="space-y-3 md:space-y-4">
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Card Number</label>
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
                          className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Card Holder Name</label>
                        <input 
                          type="text"
                          name="cardHolder"
                          value={paymentMethod.cardHolder}
                          onChange={handlePaymentChange}
                          className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'}`}
                          placeholder="John Doe"
                        />
                        {errors.cardHolder && <p className="text-red-500 text-xs mt-1">{errors.cardHolder}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                          <input 
                            type="text"
                            name="expiryDate"
                            value={paymentMethod.expiryDate}
                            onChange={handlePaymentChange}
                            className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">CVV</label>
                          <input 
                            type="password"
                            name="cvv"
                            value={paymentMethod.cvv}
                            onChange={handlePaymentChange}
                            className={`w-full p-2 border rounded-md text-slate-800 text-sm md:text-base ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  /* Order Review */
                  <div>
                    <h3 className="text-base md:text-lg font-medium mb-3 md:mb-4">Order Review</h3>
                    
                    {/* Shipping Details */}
                    <div className="mb-3 md:mb-4 p-2 md:p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1 md:mb-2">
                        <h4 className="font-medium text-sm md:text-base text-slate-800">Shipping Address</h4>
                        <button 
                          onClick={() => setCurrentStep(1)} 
                          className="text-xs md:text-sm text-red-800 hover:text-red-700"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">
                        {shippingAddress.fullName}<br />
                        {shippingAddress.address}<br />
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                        {shippingAddress.phone}
                      </p>
                    </div>
                    
                    {/* Payment Details */}
                    <div className="mb-3 md:mb-4 p-2 md:p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1 md:mb-2">
                        <h4 className="font-medium text-sm md:text-base text-slate-800">Payment Method</h4>
                        <button 
                          onClick={() => setCurrentStep(2)} 
                          className="text-xs md:text-sm text-red-800 hover:text-red-700"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">
                        {paymentMethod.cardHolder}<br />
                        **** **** **** {paymentMethod.cardNumber.slice(-4)}<br />
                        Expires: {paymentMethod.expiryDate}
                      </p>
                    </div>
                    
                    {/* Delivery Options */}
                    <div className="mb-3 md:mb-4">
                      <h4 className="font-medium mb-2 text-sm md:text-base">Delivery Options</h4>
                      <div className="space-y-2">
                        <label className="flex items-center p-2 md:p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="deliveryOption"
                            value="standard"
                            checked={deliveryOption === 'standard'}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                            className="mr-2 text-slate-800"
                          />
                          <div className="flex-1">
                            <span className="font-medium text-xs md:text-sm text-slate-800">Standard Delivery</span>
                            <p className="text-xs text-gray-600">3-5 business days</p>
                          </div>
                          <span className="font-medium text-xs md:text-sm text-slate-800">₦ 1,500</span>
                        </label>
                        
                        <label className="flex items-center p-2 md:p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="deliveryOption"
                            value="express"
                            checked={deliveryOption === 'express'}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                            className="mr-2 text-slate-800"
                          />
                          <div className="flex-1">
                            <span className="font-medium text-xs md:text-sm text-slate-800">Express Delivery</span>
                            <p className="text-xs text-gray-600">1-2 business days</p>
                          </div>
                          <span className="font-medium text-xs md:text-sm text-slate-800">₦ 3,000</span>
                        </label>
                        
                        <label className="flex items-center p-2 md:p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="deliveryOption"
                            value="next-day"
                            checked={deliveryOption === 'next-day'}
                            onChange={(e) => setDeliveryOption(e.target.value)}
                            className="mr-2 text-slate-800"
                          />
                          <div className="flex-1">
                            <span className="font-medium text-xs md:text-sm text-slate-800">Next Day Delivery</span>
                            <p className="text-xs text-gray-600">Next business day</p>
                          </div>
                          <span className="font-medium text-xs md:text-sm text-slate-800">₦ 5,000</span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Order Summary */}
                    <div className="border-t pt-3 md:pt-4">
                      <h4 className="font-medium mb-2 text-sm md:text-base">Order Summary</h4>
                      <div className="space-y-1 md:space-y-2 mb-3 md:mb-4 text-slate-700">
                        {cartItems.map((item) => (
                          <div key={item.product} className="flex justify-between">
                            <span className="text-xs md:text-sm text-gray-600">
                              {item.name} x {item.quantity}
                            </span>
                            <span className="text-xs md:text-sm font-medium">
                              ₦ {(item.unit_price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-2 space-y-1 text-black">
                        <div className="flex justify-between">
                          <span className="text-xs md:text-sm text-slate-800">Subtotal</span>
                          <span className="text-xs md:text-sm font-medium text-red-500">₦ {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs md:text-sm text-slate-800">Shipping</span>
                          <span className="text-xs md:text-sm font-medium text-red-500">₦ {shippingCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="text-sm font-medium text-slate-800">Total</span>
                          <span className="font-bold text-red-800 text-sm md:text-base">₦ {totalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {errors.submit && (
                      <div className="mt-3 md:mt-4 p-2 md:p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                        <AlertCircle size={16} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-xs md:text-sm text-red-700">{errors.submit}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {currentStep > 1 ? (
                  <button 
                    onClick={handlePrevStep}
                    className="px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-md text-slate-800 hover:bg-gray-50 transition-colors"
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                ) : (
                  <button 
                    onClick={()=>onClose(false)}
                    className="px-3 md:px-4 py-2 text-sm md:text-base border text-slate-800 border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button 
                    onClick={handleNextStep}
                    className="px-4 md:px-6 py-2 text-sm md:text-base bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium"
                  >
                    Continue
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmitOrder}
                    className="px-4 md:px-6 py-2 text-sm md:text-base bg-red-800 text-white rounded-md hover:bg-red-700 transition-colors font-medium flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Processing</span>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;