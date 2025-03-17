"use client";
import { useEffect, useState, useRef } from "react";
import { usePaystackPayment } from "react-paystack"; // Directly import since it's a hook
import { authAxios } from "@/config/axios";

interface PaystackHookProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  amount: number;
  email: string;
  orderId: string;
}

const PaystackHook: React.FC<PaystackHookProps> = ({ buttonRef, amount, email, orderId }) => {
  const [initializePayment, setInitializePayment] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const config = {
        reference: new Date().getTime().toString(),
        email,
        amount: amount * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
      };

      setInitializePayment(() => usePaystackPayment(config));
    }
  }, [amount, email]);

  return (
    <div className="w-fit">
      <button
        className="hidden"
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={() => {
          if (!initializePayment) return; // Ensure it's defined before calling
          initializePayment({
            onSuccess: async (reference) => {
              if (reference.status === "success") {
                try {
                  const payload = {
                    orderId,
                    amount,
                    reference: reference.reference,
                  };

                  const response = await authAxios.put("/orders/payment", payload);
                  console.log("Payment updated successfully:", response.data);
                } catch (error) {
                  console.error("Failed to update payment:", error);
                }
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
