import { playerDefault, sessionDefault } from "consts/defaults"
import { createZustandStore } from "../createZustandStore"
import { Actions, State } from "./types"

const initialState: State = {
  session: sessionDefault(),
  isAllReady: false,
  isMyPlayerHost: false,
  isMyPlayerLeader: false,
  myPlayer: playerDefault(),
  players: {},
  heading: {
    title: "",
    description: "",
  },
  activeQuest: {
    index: 0,
    leaderId: "",
    numPlayers: 5,
    players: [],
    votesToApprove: {},
    votesToSucceed: {},
    status: "incomplete",
    isApproved: false,
    isSuccessful: false,
  },
  playersArray: [],
}

export const useSessionStore = createZustandStore<State & Actions>({
  name: "session",
  data: (set) => ({
    ...initialState,
    updateSessionStore: (update) => set({ ...update }),
    resetSessionsStore: () => set({ ...initialState }),
  }),
  storageType: "localStorage",
})
