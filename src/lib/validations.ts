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
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters"),
  password: Yup.string()
    // .test("not-email", "Can't contain your email address", function (value) {
    //   const { email } = this.parent; // Access the email field
    //   if (!value || !email) return true; // Skip validation if no value or email
    //   return !value.includes(email);
    // })
    .test("min-chars", "At least 8 characters", (value) => {
      return value ? value.length >= 8 : false;
    })
    .required("Password is required"),
  // .test("number-or-symbol", "Contain a number or symbol", (value) => {
  //   return value ? /[\d@$!%*?&]/.test(value) : false;
  // })
  // .test("strength", "Password strength: Weak", (value) => {
  //   return value ? isStrongPassword(value) : false;
  // })
});
