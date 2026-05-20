import { updateDocument } from "services/firestore/updateDocument"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { Quest } from "types/gameSession"

export const updateActiveQuest = async (update: Partial<Quest>) => {
  const { session } = useSessionStore.getState()

  const success = await updateDocument<Quest>({
    collection: "sessions",
    id: session.id,
    data: {
      [`quests.${session.activeQuestIndex}`]: {
        ...session.quests[session.activeQuestIndex],
        ...update,
      },
    },
  })

  if (!success) throw new Error(`Unable to update quest ${session.activeQuestIndex}`)
}
