import { Toast } from "types";
import { SetStoreState } from "stores/types";

import { createZustandStore } from "../createZustandStore";
import { ToastState } from "./types";

const showToast = (
  set: SetStoreState<ToastState>,
  text: string,
  type?: Toast["type"]
) => {
  set({
    toast: {
      text,
      type,
      createdAt: Date.now(),
    },
  });
};

export const useToastStore = createZustandStore<ToastState>({
  name: "toast",
  data: (set, get) => ({
    toast: null,
    showToast: (text, type) => showToast(set, text, type),
    deleteToast: () => set({ toast: null }),
  }),
  storageType: "localStorage",
});
