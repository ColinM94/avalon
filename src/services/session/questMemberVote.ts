import { updateDocument } from "services/firestore/updateDocument"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { GameSession } from "types/gameSession"

interface Props {
  playerId: string
  voteValue: boolean
}

export const questMemberVote = async ({ playerId, voteValue }: Props) => {
  const { session } = useSessionStore.getState()

  await updateDocument<GameSession>({
    id: session.id,
    collection: "sessions",
    data: {
      [`quests.${session.activeQuestIndex}.votesToApprove.${playerId}`]: voteValue,
    },
  })
}
