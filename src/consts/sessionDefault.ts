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
    quest1: {
      index: 1,
      status: "incomplete",
    },
    quest2: {
      index: 2,
      status: "incomplete",
    },
    quest3: {
      index: 3,
      status: "incomplete",
    },
    quest4: {
      index: 4,
      status: "incomplete",
    },
    quest5: {
      index: 5,
      status: "incomplete",
    },
  };
};
