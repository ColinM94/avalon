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
  };
};
