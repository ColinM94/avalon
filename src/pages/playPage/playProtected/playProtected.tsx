import * as React from "react";
import { useNavigate } from "react-router-dom";

import { GameSession } from "types";
import { useAppStore, useSessionStore, useToastStore } from "stores";
import { getDocumentSnapshot } from "services";
import { Game, LoadingOverlay } from "components";

import { Props } from "./types";

export const PlayProtected = ({ sessionId }: Props) => {
  const navigate = useNavigate();
  const { session, updateSessionStore } = useSessionStore();
  const { showToast } = useToastStore();
  const { user } = useAppStore();

  const updateState = async (data: GameSession | undefined) => {
    try {
      if (!sessionId) throw "Invalid Session ID";
      if (!user) throw "Invalid User";
      if (!data) throw "Session not found!";

      const isAllReady = Object.values(data.players)
        .filter((player) => player.id !== session.createdBy)
        .every((item) => item.isReady);

      const activeQuest = data.quests[data.activeQuestIndex];
      const myPlayer = data.players[user.id];

      updateSessionStore({
        players: data.players,
        myPlayer,
        isMyPlayerHost: data.createdBy === user.id,
        isMyPlayerLeader: activeQuest.leaderId == myPlayer.id,
        isAllReady,
        activeQuest,
        playersArray: Object.values(data.players).sort(
          (a, b) => a.joinedAt - b.joinedAt
        ),
        session: data,
      });
    } catch (error) {
      showToast(String(error), "error");
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

  if (!sessionId || session.id !== sessionId) return <LoadingOverlay />;

  return <Game />;
};
