// AUTH ROUTES
export const signInRoute = "/auth/sign-in";
export const signUpRoute = "/auth/sign-up";
export const forgotPasswordRoute = "/auth/forgot-password";
export const OtpVerificationRoute = "/auth/sign-up/email-verification";

//Products route
export const productsRoute = "/products";
export const productRoute = (product: string) => `/products/${product}`;
