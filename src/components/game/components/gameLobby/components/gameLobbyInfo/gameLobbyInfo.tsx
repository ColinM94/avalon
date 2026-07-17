import { QRCode } from "react-qrcode-logo";

import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { baseUrl } from "consts/general";
import { classes } from "utils/classes";

import styles from "./styles.module.scss";
import { Props } from "./types";
import { Button } from "components/button/button";

export const GameLobbyInfo = ({ className }: Props) => {
  const { showToast } = useAppStore();
  const { sessionId } = useSessionStore();

  const url = `${baseUrl}/play/${sessionId}`;

  const handleCopy = () => {
    void navigator.clipboard.writeText(url);
    showToast("URL Copied!");
  };

  return (
    <div className={classes(styles.container, className)}>
      <div onClick={handleCopy} className={styles.qrCodeContainer}>
        <QRCode size={200} value={url} eyeColor="#a1701f" fgColor="#404f63" bgColor="#1a2028" />

        <Button icon="copy" onClick={handleCopy} iconClassName={styles.copyButtonIcon} className={styles.copyButton} />
      </div>

      <div onClick={handleCopy} className={styles.code}>
        {sessionId}
      </div>
    </div>
  );
};
