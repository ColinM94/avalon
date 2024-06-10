import { QRCode } from "react-qrcode-logo";

import { Header } from "components";

import styles from "./styles.module.scss";

const players = [
  {
    name: "Fred",
  },
  {
    name: "Colin",
  },
  {
    name: "Jimmy",
  },
];

export const LobbyPage = () => {
  return (
    <>
      <Header heading="Lobby" />
      <div className={styles.container}>
        <div className={styles.joinSection}>
          <div className={styles.joinCode}>28329</div>

          <QRCode value="https://github.com/gcoro/react-qrcode-logo" />
        </div>

        <div className={styles.divider} />

        <div className={styles.playersSection}>
          {players.map((player) => (
            <div className={styles.player}>{player.name}</div>
          ))}
        </div>
      </div>
    </>
  );
};
