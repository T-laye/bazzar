"use client";

import React from "react";
import { usePaystackPayment } from "react-paystack";

const config = {
  reference: new Date().getTime().toString(),
  email: "user@example.com",
  amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
};

// you can call this function anything
const onSuccess = (reference: Record<string, string>) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
};

// you can call this function anything
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log("closed");
};

const PaystackHook = ({ref}:{ref:HTMLButtonElement | null}) => {
  const initializePayment = usePaystackPayment(config);
  return (
    <div>
      <button
        ref={ref}
        onClick={() => {
          initializePayment({ onSuccess, onClose });
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default PaystackHook
