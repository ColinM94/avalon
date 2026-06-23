import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { updateDocument } from "services/firestore/updateDocument";
import { GameSession } from "types/gameSession";

interface Props {
  playerId: string;
  voteValue: boolean;
}
export const questSucceedVote = async ({ playerId, voteValue }: Props) => {
  const { sessionId, activeQuest } = useSessionStore.getState();

  await updateDocument<GameSession>({
    id: sessionId,
    collection: "sessions",
    data: {
      [`quests.${activeQuest.index}.votesToSucceed.${playerId}`]: voteValue,
    },
  });
};
