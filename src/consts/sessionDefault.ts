import { GameSession } from "types";
import { generateLobbyCode } from "utils";

export const sessionDefault = (): GameSession => {
  return {
    id: generateLobbyCode(),
    name: "",
    players: {},
    numPlayers: 5,
    createdBy: "",
    step: "lobby",
    characters: [],
    isRitualFinished: false,
    activeQuest: 0,
    isHostPlaying: true,
    quests: {
      0: {
        index: 0,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
      },
      1: {
        index: 1,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
      },
      2: {
        index: 2,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
      },
      3: {
        index: 3,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
      },
      4: {
        index: 4,
        status: "incomplete",
        numPlayers: 5,
        leaderId: "",
        players: [],
      },
    },
    leaderId: "",
  };
};
