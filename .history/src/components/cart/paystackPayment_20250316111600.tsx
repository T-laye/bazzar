"use client";

import { authAxios } from "@/config/axios";
import React from "react";
import { usePaystackPayment } from "react-paystack";

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
  return (
    <div className="w-fit">
      <button
        className="hidden"
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={() => {
          const config = {
            reference: new Date().getTime().toString(),
            email,
            amount: amount * 100,
            publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
          };

          const initializePayment = usePaystackPayment(config);

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
