import { Player } from "types";

export const playerDefault = (): Player => {
  return {
    id: "",
    name: "",
    sessionId: "",
    characterId: "",
    isHost: false,
    isReady: false,
    joinedAt: 0,
  };
};
