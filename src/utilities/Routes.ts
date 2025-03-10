// AUTH ROUTES
export const signInRoute = "/auth/sign-in";
export const signUpRoute = "/auth/sign-up";
export const forgotPasswordRoute = "/auth/forgot-password";
export const OtpVerificationRoute = "/auth/sign-up/verify";

//Products route
export const productsRoute = "/products";
export const productRoute = (productCategory: string) =>
  `/products/${productCategory}`;
export const productIdRoute = (productCategory: string, productId: string) =>
  `/products/${productCategory}/${productId}`;
