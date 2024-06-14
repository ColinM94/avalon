import { playerDefault, sessionDefault } from "consts";

import { AppState } from "./types";
import { createZustandStore } from "../createZustandStore";
import { userDefault } from "consts/userDefault";

export const useAppStore = createZustandStore<AppState>({
  name: "app",
  data: (set, get) => ({
    session: null,
    player: playerDefault(),
    user: userDefault(),
    updateUser: (update) => set({ user: { ...get().user, ...update } }),
    updateSession: (update) => {
      set({
        session: update === null ? null : { ...get().session, ...update },
      });
    },
    updatePlayer: (update) => set({ player: { ...get().player, ...update } }),
  }),
  storageType: "localStorage",
  persistState: true,
});
