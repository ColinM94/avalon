import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppStore, useSessionStore, useToastStore } from "stores";
import { LoadingOverlay } from "components";
import { getDocument, updateDocument, updateSession } from "services";
import { GameSession, User } from "types";
import { playerDefault } from "consts";

import { PlayProtected } from "./playProtected/playProtected";

export const PlayPage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const params = useParams();
  const { showToast } = useToastStore();
  const { resetSessionsStore } = useSessionStore();

  const [sessionId, setSessionId] = React.useState<string | undefined>();

  const joinSession = async () => {
    try {
      if (!params.sessionId) throw "Session ID not defined";

      const tempSession = await getDocument<GameSession>({
        id: params.sessionId,
        collection: "sessions",
      });

      if (!tempSession) throw "Session not found!";

      if (
        !tempSession?.players[user.id] &&
        Object.keys(tempSession.players).length >= tempSession.numPlayers
      ) {
        throw "Lobby is full";
      }

      if (!tempSession.players[user.id]) {
        const joinedSession = await updateSession(
          {
            [`players.${user.id}`]: {
              ...playerDefault(),
              id: user.id,
              name: user.name,
              joinedAt: Date.now(),
            },
          },
          params.sessionId
        );

        if (!joinedSession) throw "Error joining session";
      }

      await updateDocument<User>({
        collection: "users",
        id: user.id,
        data: {
          sessionId: params.sessionId,
        },
      });

      setSessionId(tempSession.id);
    } catch (error) {
      setSessionId(undefined);
      resetSessionsStore();
      showToast(String(error), "error");
      navigate("/");
    }
  };

  React.useEffect(() => {
    joinSession();
  }, [params.sessionId]);

  if (!sessionId) return <LoadingOverlay />;

  return <PlayProtected sessionId={sessionId} />;
};
