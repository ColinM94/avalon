import { GameSession } from "types";

export const sessionDefault = (): GameSession => {
  return {
    id: "",
    name: "",
    players: {},
    numPlayers: 5,
    createdBy: "",
    step: "lobby",
    characters: [],
    isRitualFinished: false,
    activeQuestIndex: 0,
    isMyPlayerHostPlaying: true,
    numFailVotes: 0,
    quests: {
      0: {
        index: 0,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        votesToApprove: {},
        votesToSucceed: {},
      },
      1: {
        index: 1,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        votesToApprove: {},
        votesToSucceed: {},
      },
      2: {
        index: 2,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        votesToApprove: {},
        votesToSucceed: {},
      },
      3: {
        index: 3,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        votesToApprove: {},
        votesToSucceed: {},
      },
      4: {
        index: 4,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
        votesToApprove: {},
        votesToSucceed: {},
      },
    },
  };
};
