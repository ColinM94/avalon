import { playerDefault, sessionDefault } from "consts";
import { Actions, State } from "./types";
import { createZustandStore } from "../createZustandStore";

const initialState: State = {
  session: sessionDefault(),
  isAllReady: false,
  isHost: false,
  myPlayer: playerDefault(),
  players: {},
  activeQuest: null,
};

export const useSessionStore = createZustandStore<State & Actions>({
  name: "session",
  data: (set) => ({
    ...initialState,
    updateSessionStore: (update) => set({ ...update }),
    resetSessionsStore: () => set({ ...initialState }),
  }),
  storageType: "localStorage",
});
