import * as React from "react";
import { QRCode } from "react-qrcode-logo";
import { useNavigate, useParams } from "react-router-dom";
import { deleteField } from "firebase/firestore";

import { deleteDocument, getDocumentSnapshot, updateDocument } from "services";
import { Button, NameEditor } from "components";
import { classes } from "utils";
import { Lobby } from "types";

import styles from "./styles.module.scss";

export const LobbyPage = () => {
  const { code: lobbyId } = useParams();
  const navigate = useNavigate();

  const [lobby, setLobby] = React.useState<Lobby | null>();
  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const playerId = localStorage.getItem("playerId");

  const player = playerId ? lobby?.players[playerId] : null;

  const players = Object.values(lobby?.players || {}).sort(
    (a, b) => a.joinedAt - b.joinedAt
  );

  React.useEffect(() => {
    if (!lobbyId) return;

    const unsubscribe = getDocumentSnapshot<Lobby>({
      id: lobbyId,
      collection: "lobbies",
      callback: (value) => {
        setLobby(value);
        if (!value) setLobby(null);
      },
    });

    return () => unsubscribe?.();
  }, [lobbyId, playerId]);

  if (lobby === null) navigate("/");

  React.useEffect(() => {
    if (!lobby || !lobbyId || !playerId) return;

    if (!lobby.players[playerId] && players.length >= lobby.numPlayers) {
      alert("The lobby is full!");
      return;
    }

    if (!lobby.players[playerId]) {
      updateDocument({
        id: lobbyId,
        collection: "lobbies",
        data: {
          [`players.${playerId}`]: {
            id: playerId,
            name: "Player",
            joinedAt: Date.now(),
          },
        },
      });
    }
  }, [lobby, lobbyId, playerId, players.length]);

  const handleLeave = async () => {
    if (!lobbyId || !playerId) return;

    if (lobby?.players[playerId]?.isHost) {
      deleteDocument({
        id: lobbyId,
        collection: "lobbies",
      });

      navigate("/");
      return;
    }

    updateDocument({
      id: lobbyId,
      collection: "lobbies",
      data: {
        [`players.${playerId}`]: deleteField(),
      },
    });

    navigate("/");
  };

  const handleReady = async () => {
    if (!lobbyId) return;

    console.log(lobby);

    await updateDocument({
      id: lobbyId,
      collection: "lobbies",
      data: {
        [`players.${playerId}`]: {
          ...player,
          isReady: true,
        },
      },
    });
  };

  if (!lobbyId || !playerId) return "Loading";

  return (
    <>
      {/* <Header heading={lobby?.name || "Lobby"} /> */}

      <NameEditor
        lobbyId={lobbyId}
        playerId={playerId}
        show={showNameEditor}
        nameDefault={lobby?.players?.[playerId]?.name || ""}
        setShow={setShowNameEditor}
      />

      <div className={styles.container}>
        <div className={styles.joinSection}>
          <div className={styles.joinCode}>{lobbyId}</div>

          <QRCode value={`http://192.168.178.65:5173/lobby/${lobbyId}`} />
        </div>

        <div className={styles.divider} />

        <div className={styles.numPlayers}>
          {players.length} / {lobby?.numPlayers}
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
            label={lobby?.players[playerId]?.isHost ? "Close Lobby" : "Leave"}
            onClick={() => handleLeave()}
            className={styles.leaveButton}
          />

          <Button
            label="Ready"
            onClick={() => handleReady()}
            disabled={lobby?.players[playerId]?.isReady}
            className={styles.readyButton}
          />
        </div>
      </div>
    </>
  );
};
