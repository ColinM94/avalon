import { updateDocument } from "services/firestore/updateDocument"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { useToastStore } from "stores/useToastStore/useToastStore"
import { Player, GameSession } from "types/gameSession"
import { User } from "types/user"

export const updatePlayer = async (userId: string, update: Partial<Player>) => {
  const { session, players } = useSessionStore.getState()
  const { showToast } = useToastStore.getState()

  try {
    await updateDocument<GameSession>({
      id: session.id,
      collection: "sessions",
      data: {
        [`players.${userId}`]: {
          ...players[userId],
          ...update,
        },
      },
    })

    if (update.name) {
      await updateDocument<User>({
        id: userId,
        collection: "users",
        data: {
          name: update.name,
        },
      })
    }
  } catch (error) {
    showToast(String(error))
  }
}
