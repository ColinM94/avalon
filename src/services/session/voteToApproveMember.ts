import { updateDocument } from "services/firestore/updateDocument";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { GameSession } from "types/gameSession";

interface Props {
  playerId: string;
  voteValue: boolean;
}

export const voteToApproveMember = async ({ playerId, voteValue }: Props) => {
  const { sessionId, activeQuest, activeMemberSelectVoteIndex } = useSessionStore.getState();

  console.log(`quests.${activeQuest.index}.memberSelectVotes${activeMemberSelectVoteIndex}.${playerId}`);

  await updateDocument<GameSession>({
    id: sessionId,
    collection: "sessions",
    data: {
      [`quests.${activeQuest.index}.memberSelectVotes.${activeMemberSelectVoteIndex}.${playerId}`]: voteValue,
    },
  });
};
