import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Unsubscribe } from "firebase/firestore";

import { useAppStore, useSessionStore, useToastStore } from "stores";
import { Game, LoadingOverlay } from "components";
import { getDocumentSnapshot, updateDocument, updateSession } from "services";
import { GameSession, User } from "types";
import { playerDefault } from "consts";

export const PlayPage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const { sessionId } = useParams();
  const { showToast } = useToastStore();
  const { session, updateSessionStore } = useSessionStore();

  const joinSession = async (id: string) => {
    const joinedSession = updateSession({
      [`players.${user.id}`]: playerDefault(user.id),
    });

    if (!joinedSession) throw "Error joining session";

    await updateDocument<User>({
      collection: "users",
      id: user.id,
      data: {
        sessionId: id,
      },
    });
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
          if (!data) throw "Session not found!";

          if (
            data &&
            (!data?.players?.[user.id] || user.sessionId !== data.id)
          ) {
            joinSession(data.id);
            return;
          }

          const numPlayersReady = Object.values(session.players).filter(
            (item) => item.isReady
          ).length;

          updateSessionStore({
            isAllReady: numPlayersReady === data.numPlayers,
            isHost: data.leaderId === user.id,
            myPlayer: data.players[user.id],
            activeQuest: session.quests[session.activeQuestIndex] || null,
            ...data,
          });
        },
      });
    } catch (error) {
      updateSession({
        id: "",
      });

      showToast(String(error), "error");
      navigate("/");
    }

    return () => unsubscribe?.();
  }, []);

  if (
    !session.id ||
    !session.players[user.id] ||
    user.sessionId !== session.id
  ) {
    return <LoadingOverlay />;
  }

  return <Game />;
};
