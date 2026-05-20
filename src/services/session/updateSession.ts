import { updateDocument } from "services/firestore/updateDocument"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { useToastStore } from "stores/useToastStore/useToastStore"
import { GameSession } from "types/gameSession"

export const updateSession = async (update: Partial<GameSession>, sessionId?: string) => {
  const { session } = useSessionStore.getState()
  const { showToast } = useToastStore.getState()

  const id = sessionId || session.id

  if (!id) {
    throw new Error("Unable to update session as no ID defined")
  }

  try {
    await updateDocument<GameSession>({
      id,
      collection: "sessions",
      data: update,
    })

    return true
  } catch (error) {
    showToast(String(error))
    return false
  }
}
