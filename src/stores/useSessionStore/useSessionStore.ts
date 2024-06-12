import { SessionState } from "./types";
import { createZustandStore } from "../createZustandStore";

export const useSessionStore = createZustandStore<SessionState>({
  name: "app",
  data: (set, get) => ({
    myPlayer: {
      characterId: "",
      id: "",
      name: "",
      isHost: false,
      isReady: false,
      joinedAt: 0,
    },
    updateSessionStore: (update) => set({ ...update }),
  }),
  storageType: "localStorage",
});
