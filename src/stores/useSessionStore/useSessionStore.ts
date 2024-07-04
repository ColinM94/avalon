import { playerDefault, sessionDefault } from "consts";
import { Actions, State } from "./types";
import { createZustandStore } from "../createZustandStore";

const initialState: State = {
  session: sessionDefault(),
  isAllReady: false,
  isMyPlayerHost: false,
  isMyPlayerLeader: false,
  myPlayer: playerDefault(),
  players: {},
  activeQuest: {
    index: 0,
    leaderId: "",
    numPlayers: 5,
    players: [],
    votesToApprove: {},
    votesToSucceed: {},
    status: "incomplete",
  },
  heading: {
    title: "Title",
    subtitle: "This is the subtitle",
  },
  playersArray: [],
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
