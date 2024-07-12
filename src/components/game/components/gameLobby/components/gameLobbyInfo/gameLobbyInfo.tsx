import { QRCode } from "react-qrcode-logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { baseUrl } from "consts";
import { useSessionStore } from "stores";
import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameLobbyInfo = ({ className }: Props) => {
  const { session } = useSessionStore();

  const url = `${baseUrl}/join/${session.id}`;

  const handleShare = () => {
    navigator.share({
      title: "Join my game of Avalon",
      url,
    });
  };

  return (
    <div className={classes(styles.container, className)}>
      <div onClick={handleShare} className={styles.info}>
        <div className={styles.infoCode}>{session.id}</div>

        <FontAwesomeIcon icon="share-nodes" className={styles.infoCopyIcon} />
      </div>

      <QRCode value={url} />
    </div>
  );
};
