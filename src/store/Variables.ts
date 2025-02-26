import { create } from "zustand";

interface ToastStore {
  message: string;
  visibility: boolean;
  type: "success" | "error" | "warning";
  showToast: (message: string, type?: "success" | "error" | "warning") => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: "",
  visibility: false,
  type: "success",

  showToast: (message, type = "success") => {
    set({ message, visibility: true, type });

    setTimeout(() => {
      set({ visibility: false });
    }, 5000);
  },

  hideToast: () => {
    set({ visibility: false });
  },
}));
