import * as React from "react";
import { QRCode } from "react-qrcode-logo";
import { useParams } from "react-router-dom";

import { getDocumentSnapshot, updateDocument } from "services";
import { Header } from "components";
import { classes } from "utils";
import { Lobby } from "types";

import styles from "./styles.module.scss";

export const LobbyPage = () => {
  const { code } = useParams();

  const [lobby, setLobby] = React.useState<Lobby>();

  const deviceId = localStorage.getItem("deviceId");

  React.useEffect(() => {
    if (!code) return;

    updateDocument({
      id: code,
      collection: "lobbies",
      data: {
        [`players.${deviceId}`]: {
          id: deviceId,
          name: deviceId,
        },
      },
    });

    const unsubscribe = getDocumentSnapshot<Lobby>({
      id: code,
      collection: "lobbies",
      callback: (value) => setLobby(value),
    });

    return () => unsubscribe?.();
  }, [code, deviceId]);

  const players = Object.values(lobby?.players || {});

  console.log(players);

  return (
    <>
      <Header heading={lobby?.name || "Lobby"} />

      <div className={styles.container}>
        <div className={styles.joinSection}>
          <div className={styles.joinCode}>{code}</div>

          <QRCode value={`http://192.168.188.49:5173/lobby/${code}`} />
        </div>

        <div className={styles.divider} />

        <div className={styles.playersSection}>
          {players.map((player) => (
            <div
              key={player.name}
              className={classes(
                styles.player,
                deviceId === player.id && styles.currentPlayer
              )}
            >
              {player.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
