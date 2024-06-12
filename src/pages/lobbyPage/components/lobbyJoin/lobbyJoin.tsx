import { QRCode } from "react-qrcode-logo";

import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const LobbyJoin = (props: Props) => {
  const { sessionId, className } = props;

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.joinCode}>{sessionId}</div>

      <QRCode value={`http://192.168.178.65:5173//lobby/${sessionId}`} />
    </div>
  );
};
