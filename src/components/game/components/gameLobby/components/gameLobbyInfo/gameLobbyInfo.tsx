import { QRCode } from "react-qrcode-logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { baseUrl } from "consts/general";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { Props } from "./types";
import { useAppStore } from "stores/useAppStore/useAppStore";

export const GameLobbyInfo = ({ className }: Props) => {
  const { showToast } = useAppStore();
  const { sessionId } = useSessionStore();

  const url = `${baseUrl}/play/${sessionId}`;

  const handleShare = () => {
    void navigator.clipboard.writeText(url);

    showToast("Copied!");
  };

  return (
    <div className={classes(styles.container, className)}>
      <div onClick={handleShare} className={styles.info}>
        <div className={styles.infoCode}>{sessionId}</div>

        <FontAwesomeIcon icon="copy" className={styles.infoCopyIcon} />
      </div>

      <QRCode value={url} />
    </div>
  );
};
