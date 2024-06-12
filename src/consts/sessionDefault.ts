import { GameSession } from "types";

export const sessionDefault = (): GameSession => {
  return {
    id: "",
    name: "",
    players: {},
    numPlayers: 0,
    createdBy: "",
  };
};
