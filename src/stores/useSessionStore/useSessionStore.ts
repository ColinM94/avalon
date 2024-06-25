import { Actions, State } from "./types";
import { createZustandStore } from "../createZustandStore";
import { sessionDefault } from "consts";

export const useSessionStore = createZustandStore<State & Actions>({
  name: "session",
  data: (set) => ({
    sessionId: "",
    players: {},
    myPlayer: {
      id: "",
      name: "",
      isHost: false,
      isReady: false,
      joinedAt: 0,
      characterId: "",
    },
    isHost: false,
    isAllReady: false,
    session: sessionDefault(),
    updateSessionStore: (update) => set({ ...update }),
  }),
  storageType: "localStorage",
  persistState: true,
});
