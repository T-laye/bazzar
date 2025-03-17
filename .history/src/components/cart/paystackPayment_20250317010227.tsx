"use client";

import { authAxios } from "@/config/axios";
import React, { useContext } from "react";
import { usePaystackPayment } from "react-paystack";
import { AppContext, IContext } from "@/providers/Context";

interface PaystackHookProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  amount: number;
  email: string;
  orderId: string;
  showSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PaystackHook: React.FC<PaystackHookProps> = ({
  buttonRef,
  amount,
  email,
  orderId,
  showSuccessModal,
}) => {
  const { setCartItems } = useContext(AppContext) as IContext;

  // Move the hook outside of the event handler
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="w-fit">
      <button
        className="hidden"
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={() => {
          initializePayment({
            onSuccess: async (reference) => {
              if (reference.status === "success") {
                const payload = {
                  orderId,
                  amount,
                  reference: reference.reference,
                };
                await authAxios.put("/orders/payment", payload);
                showSuccessModal(true);
                setCartItems([]);
              }
            },
            onClose: () => console.log("Payment dialog closed."),
          });
        }}
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default PaystackHook;
