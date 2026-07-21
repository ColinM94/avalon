import * as React from "react";
import { useLocation } from "wouter";

import { Game } from "components/game/game";
import { getDocumentSnapshot } from "services/firestore/getDocumentSnapshot";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { GameSession } from "types/gameSession";

export const PlayProtected = () => {
  const [, navigate] = useLocation();
  const { sessionId, updateSessionStore } = useSessionStore();
  const { showToast } = useAppStore();
  const { user } = useAppStore();

  const updateState = (data: GameSession | undefined) => {
    try {
      if (!sessionId) throw new Error("Invalid Session ID");
      if (!user) throw new Error("Invalid User");
      if (!data) throw new Error("Session not found!");

      const isAllReady = Object.values(data.players)
        .filter((player) => player.id !== data.createdBy)
        .every((player) => player.isReady === true);

      const activeQuest = data.quests[data.activeQuestIndex];

      const activeMemberSelectVotes = activeQuest.memberSelectVotes[data.activeMemberSelectVoteIndex] || {};

      const myPlayer = data.players[user.id];
      const numPlayers = Object.values(data.players).length;
      const numFailMemberSelectVotes = Object.values(activeQuest.memberSelectVotes).map(
        (votes) => Object.values(votes).filter((vote) => vote === false).length >= data.numPlayers / 2,
      ).length;
      const numFailQuests = Object.values(data.quests).filter((quest) => quest.isFailed === true).length;

      updateSessionStore({
        sessionId: data.id,
        players: data.players,
        myPlayer,
        isMyPlayerHost: data.createdBy === user.id,
        isMyPlayerLeader: activeQuest.leaderId == myPlayer.id,
        isAllReady,
        activeQuest,
        activeMemberSelectVotes,
        activeMemberSelectVoteIndex: data.activeMemberSelectVoteIndex,
        playersArray: Object.values(data.players).sort((a, b) => a.joinedAt - b.joinedAt),
        numPlayers,
        numFailMemberSelectVotes,
        numFailQuests,
        characters: data.characters,
        quests: data.quests,
        step: data.step,
        selectedCharacters: data.selectedCharacters,
        // session: data,
      });
    } catch (error) {
      showToast((error as Error).message, "error");
      navigate("/");
    }
  };

  React.useEffect(() => {
    if (!sessionId || user.sessionId !== sessionId) return;

    const unsubscribe = getDocumentSnapshot<GameSession>({
      id: sessionId,
      collection: "sessions",
      callback: updateState,
    });

    return () => unsubscribe?.();
  }, [sessionId]);

  return <Game />;
};
