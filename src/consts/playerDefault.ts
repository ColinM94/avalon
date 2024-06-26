import { Player } from "types";

export const playerDefault = (userId: string): Player => {
  return {
    id: userId,
    name: "",
    characterId: "",
    isHost: false,
    joinedAt: 0,
    isReady: false,
  };
};
