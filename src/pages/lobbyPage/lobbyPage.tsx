import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteField } from "firebase/firestore";

import { deleteDocument, getDocumentSnapshot, updateDocument } from "services";
import { Button } from "components";
import { GameSession } from "types";

import { LobbyPlayers } from "./components/lobbyPlayers/lobbyPlayers";
import { LobbyJoin } from "./components/lobbyJoin/lobbyJoin";

import styles from "./styles.module.scss";

export const LobbyPage = () => {
  const { code: sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = React.useState<GameSession | null>();

  const playerId = localStorage.getItem("playerId");

  const player = playerId ? session?.players[playerId] : null;

  const players = Object.values(session?.players || {}).sort(
    (a, b) => a.joinedAt - b.joinedAt
  );

  React.useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = getDocumentSnapshot<GameSession>({
      id: sessionId,
      collection: "sessions",
      callback: (value) => {
        setSession(value);
        if (!value) setSession(null);
      },
    });

    return () => unsubscribe?.();
  }, [sessionId, playerId]);

  if (session === null) {
    alert("Game not found!");
    navigate("/");
  }

  React.useEffect(() => {
    if (!session || !sessionId || !playerId) return;

    if (!session.players[playerId] && players.length >= session.numPlayers) {
      alert("The lobby is full!");
      return;
    }

    if (!session.players[playerId]) {
      updateDocument({
        id: sessionId,
        collection: "sessions",
        data: {
          [`players.${playerId}`]: {
            id: playerId,
            name: "Player",
            joinedAt: Date.now(),
          },
        },
      });
    }
  }, [session, sessionId, playerId, players.length]);

  const handleLeave = async () => {
    if (!sessionId || !playerId) return;

    if (session?.players[playerId]?.isHost) {
      deleteDocument({
        id: sessionId,
        collection: "sessions",
      });

      navigate("/");
      return;
    }

    updateDocument({
      id: sessionId,
      collection: "sessions",
      data: {
        [`players.${playerId}`]: deleteField(),
      },
    });

    navigate("/");
  };

  const handleReady = async () => {
    if (!sessionId) return;

    await updateDocument({
      id: sessionId,
      collection: "sessions",
      data: {
        [`players.${playerId}`]: {
          ...player,
          isReady: true,
        },
      },
    });
  };

  if (!sessionId || !playerId || !session) return "Loading";

  return (
    <>
      {/* <Header heading={lobby?.name || "Lobby"} /> */}

      <div className={styles.container}>
        <LobbyJoin sessionId={session.id} className={styles.join} />

        <div className={styles.divider} />

        <LobbyPlayers
          players={players}
          session={session}
          playerId={playerId}
          className={styles.players}
        />

        <div className={styles.buttons}>
          <Button
            label={session?.players[playerId]?.isHost ? "Close Lobby" : "Leave"}
            onClick={() => handleLeave()}
            className={styles.leaveButton}
          />

          <Button
            label="Ready"
            onClick={() => handleReady()}
            disabled={session?.players[playerId]?.isReady}
            className={styles.readyButton}
          />
        </div>
      </div>
    </>
  );
};
