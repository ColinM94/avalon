import { playerDefault, userDefault } from "consts";

import { AppState } from "./types";
import { createZustandStore } from "../createZustandStore";

export const useAppStore = createZustandStore<AppState>({
  name: "app",
  data: (set, get) => ({
    player: playerDefault(),
    user: userDefault(),
    updateUser: (update) => set({ user: { ...get().user, ...update } }),
  }),
  storageType: "localStorage",
  persistState: true,
});
