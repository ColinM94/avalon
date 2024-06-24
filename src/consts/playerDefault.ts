import { Player } from "types";
import { generateUniqueId } from "utils";

export const playerDefault = (): Player => {
  return {
    id: generateUniqueId(),
    name: "",
    characterId: "",
    isHost: false,
    joinedAt: 0,
    isReady: false,
  };
};
