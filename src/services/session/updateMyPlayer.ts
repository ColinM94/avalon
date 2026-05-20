import { Player } from "types/gameSession"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"

import { updatePlayer } from "./updatePlayer"

export const updateMyPlayer = async (update: Partial<Player>) => {
  const myPlayer = useSessionStore.getState().myPlayer

  await updatePlayer(myPlayer.id, update)
}
