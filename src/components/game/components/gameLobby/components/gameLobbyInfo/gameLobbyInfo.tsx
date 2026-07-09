import { QRCode } from "react-qrcode-logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { baseUrl } from "consts/general";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameLobbyInfo = ({ className }: Props) => {
  const { sessionId } = useSessionStore();

  const url = `${baseUrl}/play/${sessionId}`;

  const handleShare = () => {
    void navigator.share({
      title: "Join my game of Avalon",
      url,
    });
  };

  return (
    <div className={classes(styles.container, className)}>
      <div onClick={handleShare} className={styles.info}>
        <div className={styles.infoCode}>{sessionId}</div>

        <FontAwesomeIcon icon="share-nodes" className={styles.infoCopyIcon} />
      </div>

      <QRCode value={url} />
    </div>
  );
};
