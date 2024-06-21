import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppStore, useToastStore } from "stores";
import { GameSession } from "types";
import { getDocumentSnapshot } from "services";
import { Game, LoadingOverlay } from "components";
import { reactReducer } from "utils";
import { GameState } from "types/game";

export const PlayPage = () => {
  const { user } = useAppStore();
  const { sessionId } = useParams();
  const { showToast } = useToastStore();
  const navigate = useNavigate();

  if (!sessionId) throw "Invalid Session ID";

  const [state, updateState] = reactReducer<GameState | null>(null);

  React.useEffect(() => {
    const unsubscribe = getDocumentSnapshot<GameSession>({
      id: sessionId,
      collection: "sessions",
      callback: (data) => {
        if (!data) {
          showToast("Game not found!", "error");
          navigate("/");
          return;
        }

        updateState({
          session: data || undefined,
          isHost: user.id === data.createdBy,
          players: Object.values(data.players).sort(
            (a, b) => a.joinedAt - b.joinedAt
          ),
          myPlayer: data.players[user.id],
        });
      },
    });

    return () => unsubscribe?.();
  }, []);

  const isAllReady = state?.players.every((player) => player.isReady);

  React.useEffect(() => {
    updateState({
      isAllReady,
      players: 
    });
  }, [isAllReady]);

  if (!state) return <LoadingOverlay />;

  return <Game state={state} />;
};
