"use client";
import React, { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { toast } from "@/utilities/Helpers";

// OtpInput component
const OtpForm: React.FC = () => {
  // const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // console.log(user);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Backspace") {
      setError(false);
    }
  };

  const renderInputs = () => {
    return otp.map((value, index) => (
      <input
        key={index}
        ref={(ref) => {
          if (ref) inputRefs.current[index] = ref;
        }}
        type="text"
        maxLength={1}
        value={value}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (/^\d?$/.test(inputValue)) {
            handleChange(index, inputValue); // Allow only numeric input
          }
        }}
        onKeyDown={(e) => handleKeyDown(index, e)}
        className={`h-12 w-full rounded border border-[##CED4DA] bg-white text-center py-3 text-[#000000E5] hover:border  focus:bg-[#FAF3F3] focus:outline-none duration-100  p-0  focus:border-primary  max-w-12`}
      />
    ));
  };

  function handleSubmit() {
    console.log(otp.join(""));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast("Email Verified", "success");
      // toast.success("Verified");
      // router.push(selectRoleRoute)
    }, 1000);
  }

  return (
    <div className="">
      <div className="flex justify-center gap-4">{renderInputs()}</div>
      {error && !otp.includes("") && (
        <div className="text-xs text-error mt-2 text-center">Invalid Otp</div>
      )}
      {!otp.includes("") && (
        <Button
          css="w-full max-w-sm mx-auto mt-6"
          fn={handleSubmit}
          style="primary"
          type="button"
          loading={loading}
        >
          Verify Email
        </Button>
      )}
    </div>
  );
};

export default OtpForm;
