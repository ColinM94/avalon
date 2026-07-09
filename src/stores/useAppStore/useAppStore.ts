import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { userDefault } from "consts/defaults";
import { Actions, State } from "./types";

export const useAppStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: userDefault(),
      toast: null,
      showToast: (text, type) =>
        set({
          toast: {
            text,
            type,
            createdAt: Date.now(),
          },
        }),
      deleteToast: () => set({ toast: null }),
      updateAppStore: (update) => set(update),
    }),
    {
      name: "app",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
