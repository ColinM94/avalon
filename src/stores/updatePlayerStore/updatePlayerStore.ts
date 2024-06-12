import { playerDefault } from "consts";

import { PlayerState } from "./types";
import { createZustandStore } from "../createZustandStore";

export const usePlayerStore = createZustandStore<PlayerState>({
  name: "player",
  data: (set) => ({
    ...playerDefault(),
    updatePlayerStore: (update) => set({ ...update }),
  }),
  storageType: "localStorage",
  persistState: true,
});
