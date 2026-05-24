import { useSessionStore } from "stores/useSessionStore/useSessionStore"

export const questMemberSelectCanContinue = () => {
  const { activeQuest } = useSessionStore.getState()

  if (activeQuest.numPlayers !== activeQuest.players.length) {
    return `Please select ${activeQuest.numPlayers} players.`
  }

  return true
}
