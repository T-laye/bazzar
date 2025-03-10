import { create } from "zustand";

interface VariableStore {
  message?: string;
  visibility?: boolean;
  type?: "success" | "error" | "warning";
  showToast?: (message: string, type?: "success" | "error" | "warning") => void;
  hideToast?: () => void;

  setCategory?: (category: string) => void;
  category?: string;
}

export const useProductsCategory = create<VariableStore>((set) => ({
  category: "",
  setCategory: (category: string) => set({ category }),
}));

export const useToastStore = create<VariableStore>((set) => ({
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
