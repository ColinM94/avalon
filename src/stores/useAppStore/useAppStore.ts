import { playerDefault, sessionDefault } from "consts";

import { AppState } from "./types";
import { createZustandStore } from "../createZustandStore";

export const useAppStore = createZustandStore<AppState>({
  name: "app",
  data: (set, get) => ({
    session: sessionDefault(),
    player: playerDefault(),
    updateSession: (update) =>
      set({ session: { ...get().session, ...update } }),
    updatePlayer: (update) => set({ player: { ...get().player, ...update } }),
  }),
  storageType: "localStorage",
  persistState: true,
});
