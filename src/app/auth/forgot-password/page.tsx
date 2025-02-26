"use client";
import React from "react";
import AuthLayout from "@/components/layouts/AuthPageLayout";
import Button from "@/components/ui/Button";
// import { FcGoogle } from "react-icons/fc";
import InputField from "@/components/ui/InputField";
import { IUser } from "@/lib/types";
import { useFormik } from "formik";
import { signInValidationSchema } from "@/lib/validations";
import { signInRoute } from "@/utilities/Routes";
import Link from "next/link";

export default function Page() {
  const formik = useFormik<Partial<IUser>>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      const { email, password, firstName, lastName } = values;
      console.log({ email, password, firstName, lastName });
    },
  });

  return (
    <AuthLayout message="Please login into your account.">
      <div className="py-20 flex justify-center min-h-full itemscenter">
        <div className="bg-green300 w-full sm:w-3/4">
          <h3 className="font-bold text-2xl text-center">Forgot Password</h3>
          <p className="text-center mt-2 mb-7">
            Don&apos;t worry, we&apos;ll send you reset instructions.
          </p>

          {/* <Button
            style="google"
            css="w-full flex justify-center gap-4"
            type="button"
          >
            <FcGoogle size={24} /> <span>Sign In With Google</span>
          </Button>

          <div className="text-[#a9a9a9a9] flex items-center justify-center gap-4 mt-4">
            <div className="h-[1px] w-full bg-[#a9a9a9a9]"></div>
            <div className="text-[#a9a9a9]">OR</div>
            <div className="h-[1px] w-full bg-[#a9a9a9a9]"></div>
          </div> */}

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 mt-10"
          >
            <InputField
              name="email"
              label="Email Address"
              value={formik.values.email || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
              placeholder="Enter your email here"
            />

            <Button style="primary" type="submit" css="mt-5">
              Reset Password
            </Button>
          </form>

          <div className="text-center mt-4 font-medium">
            I remember my password,{" "}
            <Link href={signInRoute} className="font-bold text-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
