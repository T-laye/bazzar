"use client";
import OtpForm from "@/components/forms/OtpForm";
import AuthPageLayout from "@/components/layouts/AuthPageLayout";
// import { toast } from "@/utilities/Helpers";
// import Toast from "@/components/Toast";
// import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  // const searchParams = useSearchParams();
  // const email = searchParams.get("email");
  //   const { mutate } = useSendOtp();

  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    // if (email) {
      //   mutate({ email });

      setResendMessage("OTP sent again.");
      setTimeout(() => setResendMessage(null), 5000); // Clear the message after 5 seconds
    // }
  };

  return (
    <AuthPageLayout message="Verify your email">
      <div className="bg-green300 w-full sm:w-3/4">
        <h3 className="font-bold text-2xl text-center">Email Verification</h3>
        <p className="text-center mt-2 mb-10">
          Enter the code sent to your email inbox or spam.
        </p>

        <OtpForm />

        <div className="mt-4">
          <p className="text-center">
            {resendMessage && (
              <span className="text-text-strong underline">
                {resendMessage}
              </span>
            )}
          </p>

          <div className="text-center mt-2">
            {canResend ? (
              <p>
                Didn&apos;t receive the OTP?{" "}
                <span
                  onClick={handleResend}
                  className="cursor-pointer font-bold text-primary"
                >
                  Resend
                </span>
              </p>
            ) : (
              <span>Resend available in {countdown} seconds</span>
            )}
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
}
