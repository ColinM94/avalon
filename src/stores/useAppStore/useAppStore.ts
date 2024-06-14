import { playerDefault, sessionDefault } from "consts";

import { AppState } from "./types";
import { createZustandStore } from "../createZustandStore";
import { userDefault } from "consts/userDefault";

export const useAppStore = createZustandStore<AppState>({
  name: "app",
  data: (set, get) => ({
    session: sessionDefault(),
    player: playerDefault(),
    user: userDefault(),
    updateUser: (update) => set({ user: { ...get().user, ...update } }),
    updateSession: (update) =>
      set({ session: update ? { ...get().session, ...update } : null }),
    updatePlayer: (update) => set({ player: { ...get().player, ...update } }),
  }),
  storageType: "localStorage",
  persistState: true,
});
