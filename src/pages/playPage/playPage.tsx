import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Unsubscribe } from "firebase/firestore";

import { useAppStore, useSessionStore, useToastStore } from "stores";
import { LoadingOverlay } from "components";
import { getDocumentSnapshot, updateDocument } from "services";
import { GameSession, User } from "types";
import { playerDefault } from "consts";

import { PlayProtected } from "./components/playGame/playProtected";

export const PlayPage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const { sessionId } = useParams();
  const { showToast } = useToastStore();
  const { sessionId: id, players, updateSessionStore } = useSessionStore();

  const joinSession = async (id: string) => {
    try {
      const joinedSession = await updateDocument<GameSession>({
        collection: "sessions",
        id,
        data: {
          [`players.${user.id}`]: playerDefault(),
        },
      });

      if (!joinedSession) throw "Error joining session";

      await updateDocument<User>({
        collection: "users",
        id: user.id,
        data: {
          sessionId: id,
        },
      });
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  React.useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    try {
      if (!sessionId) throw "Invalid Session ID";
      if (!user) throw "Invalid User";

      unsubscribe = getDocumentSnapshot<GameSession>({
        id: sessionId,
        collection: "sessions",
        callback: (data) => {
          updateSessionStore({
            isAllReady: Object.values(players)?.every(
              (player) => player.isReady
            ),
            isHost: data?.leaderId === user.id,
            myPlayer: data?.players[user.id],
            players: data?.players,
          });

          if (!data) throw "Session not found!";
          if (!data?.players?.[user.id]) joinSession(data.id);
        },
      });
    } catch (error) {
      showToast(String(error), "error");
      navigate("/");
    }

    return () => unsubscribe?.();
  }, []);

  if (!id || !players[user.id] || user.sessionId !== id) {
    return <LoadingOverlay />;
  }

  return <PlayProtected />;
};
