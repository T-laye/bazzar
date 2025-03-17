"use client";

import dynamic from "next/dynamic";

// Dynamically import the PaystackHookWrapper component (NOT the hook)
const PaystackHookWrapper = dynamic(() => import("./paystackPayment"), {
  ssr: false, // Ensures it only loads on the client
});

export default PaystackHookWrapper;


// the purpose of this is to beat windows is undefined error