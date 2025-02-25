"use client";
import React from "react";
import AuthLayout from "@/components/layouts/AuthPageLayout";
import Button from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import InputField from "@/components/ui/InputField";
import { IUser } from "@/lib/types";
import { useFormik } from "formik";
import { signInValidationSchema } from "@/lib/validations";
import { forgotPasswordRoute, signUpRoute } from "@/utilities/Routes";
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
      <div className="py-20 flex justify-center min-h-full items-center">
        <div className="bg-green300 w-full sm:w-3/4">
          <h3 className="font-bold text-2xl text-center">Sign In</h3>
          <p className="text-center mt-2 mb-7">Welcome, Enter your details.</p>

          <Button
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
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 mt-10"
          >
            <InputField
              name="email"
              label="Email"
              value={formik.values.email || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
            <InputField
              name="password"
              label="Password"
              type="password"
              value={formik.values.password || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoComplete="new-password" // or "current-password" based on context
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
            />
            <div className="text-right">
              <Link href={forgotPasswordRoute} className="text-primary">
                Forgot Password?
              </Link>
            </div>

            <Button style="primary" type="submit" css="mt-5">
              Submit
            </Button>
          </form>

          <div className="text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link href={signUpRoute} className="text-primary font-bold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
