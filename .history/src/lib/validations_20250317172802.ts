import * as Yup from "yup";

// Helper function to validate password strength
export const isStrongPassword = (password: string) => {
  // Regex for strong passwords allowing more special characters
  return /^(?=.*[A-Za-z])(?=.*[\d!@#$%^&*(),.?":{}|<>;'[\]~\-_=+])[A-Za-z\d!@#$%^&*(),.?":{}|<>;'[\]~\-_=+]{8,}$/.test(
    password
  );
};

// Yup Validation Schema
export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .test("min-chars", "At least 8 characters", (value) => {
      return value ? value.length >= 8 : false;
    })
    .required("Password is required"),
});

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  name: Yup.object().shape({
    first_name: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters"),
    last_name: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters"),
    middle_name: Yup.string()
      .nullable()
      .max(50, "Middle name must not exceed 50 characters"),
  }),
  address: Yup.object().shape({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip Code is required"),
    country: Yup.string().required("Country is required"),
    default_address: Yup.boolean()
  }),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\+?[0-9]{7,15}$/, "Invalid phone number"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
