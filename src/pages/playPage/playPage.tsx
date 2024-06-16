import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAppStore, useToastStore } from "stores";
import { GameSession } from "types";
import { getDocumentSnapshot } from "services";
import { Game } from "components";

import styles from "./styles.module.scss";

export const PlayPage = () => {
  const { user } = useAppStore();
  const { sessionId } = useParams();
  const { showToast } = useToastStore();
  const navigate = useNavigate();

  if (!sessionId) throw "Invalid Session ID";

  const [session, setSession] = React.useState<GameSession | null>();

  React.useEffect(() => {
    const unsubscribe = getDocumentSnapshot<GameSession>({
      id: sessionId,
      collection: "sessions",
      callback: (data) => {
        console.log(sessionId, data);
        setSession(data || null);
      },
    });

    return () => unsubscribe?.();
  }, []);

  React.useEffect(() => {
    if (session === null) {
      showToast("Game not found!", "error");
      navigate("/");
    }
  }, [session]);

  if (!session || !user || !session.players[user.id])
    return <div className={styles.message}>...loading</div>;

  const players = Object.values(session?.players).sort(
    (a, b) => a.joinedAt - b.joinedAt
  );

  const isHost = user.id === session.createdBy;

  return (
    <div className={styles.message}>
      <Game session={session} user={user} isHost={isHost} players={players} />
    </div>
  );
};
