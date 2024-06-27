import { Player } from "types";

export const playerDefault = (): Player => {
  return {
    id: "",
    name: "",
    characterId: "",
    isHost: false,
    joinedAt: 0,
    isReady: false,
  };
};
