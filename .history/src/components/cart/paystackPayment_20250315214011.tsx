"use client";

import React from "react";
import { usePaystackPayment } from "react-paystack";



// This function is called on successful payment
const onSuccess = (reference: Record<string, string>) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// This function is called when the Paystack dialog is closed
const onClose = () => {
  // implementation for whatever you want to do when the Paystack dialog closes
  console.log("closed");
};

const PaystackHook = ({ buttonRef,amount,email }: { buttonRef: React.RefObject<HTMLButtonElement>,amount:number,email:string }) => {
    const config = {
        reference: new Date().getTime().toString(),
        email,
        amount: amount * 2, // Amount is in the country's lowest currency. E.g., Kobo, so 20000 kobo = N200
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
      };
  const initializePayment = usePaystackPayment(config);

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => {
          initializePayment({ onSuccess, onClose });
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default PaystackHook;
