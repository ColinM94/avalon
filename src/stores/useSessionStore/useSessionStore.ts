import { playerDefault, sessionDefault } from "consts";
import { Actions, State } from "./types";
import { createZustandStore } from "../createZustandStore";

export const useSessionStore = createZustandStore<State & Actions>({
  name: "session",
  data: (set) => ({
    session: sessionDefault(),
    isAllReady: false,
    isHost: false,
    myPlayer: playerDefault(""),
    players: {},
    activeQuest: null,
    updateSessionStore: (update) => set({ ...update }),
  }),
  storageType: "localStorage",
  persistState: true,
});
