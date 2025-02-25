import { create } from "zustand";

interface NavStore {
  isNavOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  toggleNav: () => void;
}

export const useNavStore = create<NavStore>((set) => ({
  isNavOpen: false,

  openNav: () => {
    set({ isNavOpen: true });
  },
  closeNav: () => set({ isNavOpen: false }),

  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}));
