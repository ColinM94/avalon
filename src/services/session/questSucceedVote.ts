import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { updateSession } from "./updateSession"

interface Props {
  playerId: string
  voteValue: boolean
}
export const questSucceedVote = ({ playerId, voteValue }: Props) => {
  const { activeQuest } = useSessionStore.getState()

  void updateSession({
    [`quests.${activeQuest.index}.votesToSucceed.${playerId}`]: voteValue,
  })
}
