import { createZustandStore } from "../createZustandStore";
import { ToastState } from "./types";
import { SetStoreState } from "stores/types";

const showToast = (text: string, set: SetStoreState<ToastState>) => {
  set({
    toast: {
      text,
      createdAt: Date.now(),
    },
  });
};

export const useToastStore = createZustandStore<ToastState>({
  name: "app",
  data: (set, get) => ({
    toast: null,
    showToast: (text) => showToast(text, set),
    deleteToast: () => set({ toast: null }),
  }),
  storageType: "localStorage",
});
