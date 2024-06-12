import { createZustandStore } from "../createZustandStore";
import { AppState } from "./types";

export const useAppStore = createZustandStore<AppState>({
  name: "app",
  data: (set, get) => ({
    updateAppStore: (update) => set({ ...update }),
  }),
  storageType: "localStorage",
});
