import { Player } from "types";
import { generateUniqueId } from "utils";

export const playerDefault = (): Player => {
  return {
    id: generateUniqueId(),
    name: "",
    characterId: "",
    isHost: false,
    isReadyLobby: false,
    isReadyCharacterReveal: false,
    isReadyRitual: false,
    joinedAt: 0,
  };
};
