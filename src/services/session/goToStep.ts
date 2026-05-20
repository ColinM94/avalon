import { updateSession } from "./updateSession"
import { updatePlayer } from "./updatePlayer"
import { GameSession, Player } from "types/gameSession"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"

interface Props {
  step: GameSession["step"]
  playerUpdates?: Record<string, Partial<Player>>
}

export const goToStep = async ({ step, playerUpdates }: Props) => {
  const { playersArray } = useSessionStore.getState()

  const promises: Promise<void>[] = []

  playersArray.forEach((player) => {
    const update: Partial<Player> = {
      ...(playerUpdates && { ...playerUpdates[player.id] }),
      isReady: false,
    }

    promises.push(updatePlayer(player.id, update))
  })

  await Promise.all(promises)

  void updateSession({
    step,
  })
}
