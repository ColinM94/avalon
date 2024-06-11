import * as React from "react";
import { QRCode } from "react-qrcode-logo";
import { useNavigate, useParams } from "react-router-dom";
import { deleteField } from "firebase/firestore";

import { deleteDocument, getDocumentSnapshot, updateDocument } from "services";
import { Button, NameEditor } from "components";
import { classes } from "utils";
import { GameSession } from "types";

import styles from "./styles.module.scss";

export const LobbyPage = () => {
  const { code: sessionId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = React.useState<GameSession | null>();
  const [showNameEditor, setShowNameEditor] = React.useState(false);

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

  if (!sessionId || !playerId) return "Loading";

  return (
    <>
      {/* <Header heading={lobby?.name || "Lobby"} /> */}

      <NameEditor
        sessionId={sessionId}
        playerId={playerId}
        show={showNameEditor}
        nameDefault={session?.players?.[playerId]?.name || ""}
        setShow={setShowNameEditor}
      />

      <div className={styles.container}>
        <div className={styles.joinSection}>
          <div className={styles.joinCode}>{sessionId}</div>

          <QRCode value={`http://192.168.188.49:5173/lobby/${sessionId}`} />
        </div>

        <div className={styles.divider} />

        <div className={styles.numPlayers}>
          {players.length} / {session?.numPlayers}
        </div>

        <div className={styles.playersSection}>
          {players.map((player) => {
            const isCurrentPlayer = playerId === player.id;

            return (
              <div
                key={player.id}
                className={classes(
                  styles.player,
                  isCurrentPlayer && styles.currentPlayer
                )}
              >
                {isCurrentPlayer && (
                  <div
                    onClick={() => setShowNameEditor(true)}
                    key={player.id}
                    className={styles.editButton}
                  >
                    Edit
                  </div>
                )}
                {player.name}

                {player.isReady && (
                  <div className={styles.checkmark}>&#x2713;</div>
                )}
              </div>
            );
          })}
        </div>

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
