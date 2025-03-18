"use client";
import React, { useEffect, useState } from "react";
import AuthLayout from "@/components/layouts/AuthPageLayout";
import Button from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";
import InputField from "@/components/ui/InputField";
import { useFormik } from "formik";
import { signUpValidationSchema } from "@/lib/validations";
import { OtpVerificationRoute, signInRoute } from "@/utilities/Routes";
import Link from "next/link";
import { useCreateCustomer } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface IUser {
  name: {
    first_name: string;
    last_name: string;
    middle_name: string;
    _id: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    default_address: boolean;
    _id: string;
  };
  email?: string;
  password?: string;
  phoneNumber?: string;
  picture?: string;
  user_id?: string;
  otp?: string;
}

export default function Page() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useCreateCustomer();

  // console.log(data);

  const formik = useFormik<IUser>({
    initialValues: {
      name: {
        first_name: "",
        last_name: "",
        middle_name: "",
        _id: "",
      },
      address: {
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        default_address: false,
        _id: "",
      },
      email: "",
      password: "",
      phoneNumber: "",
      picture: "",
    },
    validationSchema: signUpValidationSchema,
    onSubmit: (values) => {
      // console.log("Form Submitted:", values);
      // console.log("Errors:", formik.errors);
      mutate(values);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push(`${OtpVerificationRoute}?email=${formik.values.email}`);
    }
  }, [formik.values.email, isSuccess, router]);

  // Handle Next Step
  const nextStep = () => setStep((prev) => prev + 1);
  // Handle Previous Step
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <AuthLayout message="Please register to create new account">
      <div className="bg-green300 w-full sm:w-3/4">
        <h3 className="font-bold text-2xl text-center">Sign Up</h3>
        <p className="text-center mt-2 mb-7">
          Create an account to shop with us
        </p>

        <Button
          style="google"
          css="w-full flex justify-center gap-4"
          type="button"
        >
          <FcGoogle size={24} /> <span>Sign Up With Google</span>
        </Button>

        <div className="text-[#a9a9a9a9] flex items-center justify-center gap-4 mt-4">
          <div className="h-[1px] w-full bg-[#a9a9a9a9]"></div>
          <div className="text-[#a9a9a9]">OR</div>
          <div className="h-[1px] w-full bg-[#a9a9a9a9]"></div>
        </div>

        <form
          onSubmit={
            formik.handleSubmit}
          className="flex flex-col gap-4 mt-10"
        >
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <>
              <InputField
                name="name.first_name"
                label="First Name"
                value={formik.values.name?.first_name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.name?.first_name &&
                  formik.errors.name?.first_name
                    ? formik.errors.name?.first_name
                    : null
                }
              />
              <InputField
                name="name.last_name"
                label="Last Name"
                value={formik.values.name.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.name?.last_name &&
                  formik.errors.name?.last_name
                    ? formik.errors.name?.last_name
                    : null
                }
              />
              <InputField
                name="name.middle_name"
                label="Middle Name"
                value={formik.values.name.middle_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Optional"
              />
            </>
          )}

          {/* Step 2: Address Information */}
          {step === 2 && (
  <>
    <InputField
      name="address.street"
      label="Street"
      value={formik.values.address?.street || ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched.address?.street && 
        formik.errors.address ? 
          (typeof formik.errors.address === 'string' ? 
            null : // Handle case where address has a string error
            (formik.errors.address && 
            typeof formik.errors.address === 'object' && 
            'street' in formik.errors.address ? 
              formik.errors.address.street as string : 
              null)
          ) : 
          null
      }
    />
    <InputField
      name="address.city"
      label="City"
      value={formik.values.address?.city || ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched.address?.city && 
        formik.errors.address ? 
          (typeof formik.errors?.address === 'string' ? 
            null : // Handle case where address has a string error
            (formik.errors.address && 
            typeof formik.errors.address === 'object' && 
            'city' in formik.errors.address ? 
              formik.errors.address.city as string : 
              null)
          ) : 
          null
      }
    />
    <InputField
        name="address.state"
        label="State"
        value={formik.values.address?.state || ""}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.address?.state && 
          formik.errors.address ? 
            (typeof formik.errors.address === 'string' ? 
              null : // Handle case where address has a string error
              (formik.errors.address && 
              typeof formik.errors.address === 'object' && 
              'state' in formik.errors.address ? 
                formik.errors.address.state as string : 
                null)
            ) : 
            null
        }
      />
    <InputField
      name="address.zip_code"
      label="Zip Code"
      value={formik.values.address?.zip_code || ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched.address?.zip_code && 
        formik.errors.address ? 
          (typeof formik.errors.address === 'string' ? 
            null : // Handle case where address has a string error
            (formik.errors.address && 
            typeof formik.errors.address === 'object' && 
            'zip_code' in formik.errors.address ? 
              formik.errors.address.zip_code as string : 
              null)
          ) : 
          null
      }
    />
    <InputField
      name="address.country"
      label="Country"
      value={formik.values.address?.country || ""}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      error={
        formik.touched.address?.country && 
        formik.errors.address ? 
          (typeof formik.errors.address === 'string' ? 
            null : // Handle case where address has a string error
            (formik.errors.address && 
            typeof formik.errors.address === 'object' && 
            'country' in formik.errors.address ? 
              formik.errors.address.country as string : 
              null)
          ) : 
          null
      }
    />
  </>
)}

          {/* Step 3: Account Information */}
          {step === 3 && (
            <>
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
                name="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? formik.errors.phoneNumber
                    : null
                }
              />
              <InputField
                name="password"
                label="Create Password"
                type="password"
                value={formik.values.password || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null
                }
              />
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-5">
            {step > 1 && (
              <Button type="button" style="secondary" fn={prevStep}>
                Previous
              </Button>
            )}
            {step < 3 && step !== 3 && (
              <Button type="button" style="primary" fn={nextStep}>
                Next
              </Button>
            )}
            {step === 3 && (
              <Button type="submit"  loading={isPending} style="primary">
                Submit
              </Button>
            )}
          </div>
        </form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link href={signInRoute} className="text-primary font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
