import { Player } from "types";

export const playerDefault = (): Player => {
  return {
    id: "",
    name: "",
    characterId: "",
    isMyPlayerHost: false,
    joinedAt: 0,
    isReady: false,
  };
};
