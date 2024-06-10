import * as React from "react";
import { QRCode } from "react-qrcode-logo";

import { Header } from "components";
import { generateLobbyCode } from "utils";

import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";

const players = [
  {
    id: 1,
    name: "Fred",
  },
  {
    id: 2,
    name: "Colin",
  },
  {
    id: 3,
    name: "Jimmy",
  },
  {
    id: 4,
    name: "Potato",
  },
  {
    id: 5,
    name: "John",
  },
  {
    id: 6,
    name: "Sarah",
  },
];

export const LobbyPage = () => {
  const { code } = useParams();

  return (
    <>
      <Header heading="Lobby" />
      <div className={styles.container}>
        <div className={styles.joinSection}>
          <div className={styles.joinCode}>{code}</div>

          <QRCode value={`https://avalon-539ca.web.app/${code}`} />
        </div>

        <div className={styles.divider} />

        <div className={styles.playersSection}>
          {players.map((player) => (
            <div key={player.name} className={styles.player}>
              {player.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
