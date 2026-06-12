import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { updateSession } from "./updateSession";

export const selectQuestMember = (playerId: string) => {
  const { activeQuest, session } = useSessionStore.getState();

  const isMaxPlayers = activeQuest.players.length >= activeQuest.numPlayers;

  const updatedQuestPlayers = activeQuest.players;

  if (updatedQuestPlayers.includes(playerId)) {
    updatedQuestPlayers.splice(updatedQuestPlayers.indexOf(playerId), 1);
  } else if (!isMaxPlayers) {
    updatedQuestPlayers.push(playerId);
  } else {
    return;
  }

  const updatedQuests = structuredClone(session.quests);

  updatedQuests[activeQuest.index].players = updatedQuestPlayers;

  void updateSession({
    quests: updatedQuests,
  });
};
