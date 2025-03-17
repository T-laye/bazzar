"use client";

import React, { useRef } from "react";
import { usePaystackPayment } from "react-paystack";

interface PaystackHookProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  amount: number;
  email: string;
  orderId: string;
}

const PaystackHook: React.FC<PaystackHookProps> = ({ buttonRef, amount, email,orderId }) => {
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount:amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="w-fit">
      <button
      className="hidden"
        ref={buttonRef as React.RefObject<HTMLButtonElement>} // Type assertion ensures safety
        onClick={() => initializePayment({ 
          onSuccess: (reference) => {
            if(reference.status === 'success') {
                const payload = {
                    
                }
            }
          },
          onClose: () => console.log("Payment dialog closed."),
        })}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default PaystackHook;
