"use client";
import { useEffect, useState, useRef } from "react";
import { usePaystackPayment } from "react-paystack";
import { authAxios } from "@/config/axios";

interface PaystackHookProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  amount: number;
  email: string;
  orderId: string;
}

const PaystackHook: React.FC<PaystackHookProps> = ({ buttonRef, amount, email, orderId }) => {
  const [paystackConfig, setPaystackConfig] = useState<any>(null);
  const initializePayment = usePaystackPayment(paystackConfig); // Get the function to trigger payment

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPaystackConfig({
        reference: new Date().getTime().toString(),
        email,
        amount: amount * 100,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
      });
    }
  }, [amount, email]);

  const handlePayment = () => {
    if (!initializePayment) return; // Ensure it's defined before calling

    initializePayment(
      (reference:Record<string,string>) => {
        console.log("Payment successful:", reference);
        handlePaymentSuccess(reference);
      },
    //   () => console.log("Payment dialog closed.")
    );
  };

  const handlePaymentSuccess = async (reference: any) => {
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
  };

  return (
    <div className="w-fit">
      <button
        className="hidden"
        ref={buttonRef as React.RefObject<HTMLButtonElement>}
        onClick={handlePayment} // Call payment function
      >
        Paystack Hooks Implementation
      </button>
    </div>
  );
};

export default PaystackHook;
