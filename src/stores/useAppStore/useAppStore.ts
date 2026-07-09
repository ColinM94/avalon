import { Actions, State } from "./types";
import { createZustandStore } from "../createZustandStore";
import { userDefault } from "consts/defaults";
import { SetStoreState } from "stores/types";
import { Toast } from "types/toast";

const showToast = (set: SetStoreState<State>, text: string, type?: Toast["type"]) => {
  set({
    toast: {
      text,
      type,
      createdAt: Date.now(),
    },
  });
};

export const useAppStore = createZustandStore<State & Actions>({
  name: "app",
  data: (set) => ({
    user: userDefault(),
    toast: null,
    showToast: (text, type) => showToast(set, text, type),
    deleteToast: () => set({ toast: null }),
    updateAppStore: (update) => set({ ...update }),
  }),
  storageType: "localStorage",
  persistState: true,
});
