'use client'
import { useState } from "react";
import { PaystackButton } from "react-paystack";

interface PaystackIntake{
    email:string;
    amount: number;
    paymentStatus:(status:string)=>void;
}
const PaystackPayment = ({email, amount, paymentStatus}:PaystackIntake) => {
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string; // Replace with your Paystack public key
  // Get user email from state/auth
    console.log(amount, email)
    const componentProps = {
        email,
        amount: amount * 10,
        currency: "NGN",
        publicKey,
        text: "Pay Now",
        onSuccess: (response:any) => {
            console.log("Payment successful!", response);
            paymentStatus(response?.status?.toString()); // Call your payment status function here
            // alert("Payment successful! Reference: " + response?.reference + response?.status);
        },
        onClose: () => alert("Transaction was not completed"),
    };

    return <PaystackButton {...componentProps} className="w-full bg-emerald-600 h-[40px] rounded-[10px]"  />;
};

export default PaystackPayment;
