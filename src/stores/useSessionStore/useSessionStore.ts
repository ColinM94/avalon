import { playerDefault } from "consts/defaults";
import { createZustandStore } from "../createZustandStore";
import { Actions, State } from "./types";

const initialState: State = {
  sessionId: "",
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
    memberSelectVotes: {},
    votesToSucceed: {},
    status: "incomplete",
    isApproved: false,
    isSuccessful: false,
    isFailed: false,
  },
  step: "lobby",
  playersArray: [],
  numPlayers: 0,
  activeMemberSelectVotes: {},
  numFailMemberSelectVotes: 0,
  numFailQuests: 0,
  characters: [],
  quests: {},
  activeMemberSelectVoteIndex: 0,
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
