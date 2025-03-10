// import { useToastStore } from "@/store/Variables";

// export const toast = (
//   message: string,
//   type: "success" | "error" | "warning" = "success"
// ) => {
//   useToastStore.getState().showToast(message, type);
// };

export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};