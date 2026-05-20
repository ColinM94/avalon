import { Player } from "types/gameSession"

export const playerDefault = (): Player => {
  return {
    id: "",
    name: "",
    characterId: "",
    isMyPlayerHost: false,
    joinedAt: 0,
    isReady: false,
  }
}
