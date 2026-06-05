import * as React from "react";
import { useLocation } from "wouter";

import { Game } from "components/game/game";
import { LoadingOverlay } from "components/loadingOverlay/loadingOverlay";
import { getDocumentSnapshot } from "services/firestore/getDocumentSnapshot";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { GameSession } from "types/gameSession";

import { Props } from "./types";

export const PlayProtected = ({ sessionId }: Props) => {
  const [, navigate] = useLocation();
  const { session, updateSessionStore } = useSessionStore();
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
      const myPlayer = data.players[user.id];

      updateSessionStore({
        players: data.players,
        myPlayer,
        isMyPlayerHost: data.createdBy === user.id,
        isMyPlayerLeader: activeQuest.leaderId == myPlayer.id,
        isAllReady,
        activeQuest,
        playersArray: Object.values(data.players).sort((a, b) => a.joinedAt - b.joinedAt),
        numPlayers: Object.values(data.players).length,
        session: data,
      });
    } catch (error) {
      const err = error as Error;
      showToast(err.message, "error");
      navigate("/");
    }
  };

  console.log(session);

  React.useEffect(() => {
    if (!sessionId || user.sessionId !== sessionId) return;

    const unsubscribe = getDocumentSnapshot<GameSession>({
      id: sessionId,
      collection: "sessions",
      callback: updateState,
    });

    return () => unsubscribe?.();
  }, [sessionId]);

  if (!sessionId || session.id !== sessionId) return <LoadingOverlay />;

  return <Game />;
};
