import { QRCode } from "react-qrcode-logo";

import { classes } from "utils";
import { useToastStore } from "stores";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const PlayJoin = (props: Props) => {
  const { session, className } = props;

  const { showToast } = useToastStore();

  const url = `http://192.168.178.65:5173/lobby/${session.id}`;

  const joinSession = () => {};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    showToast("Url copied to clipboard", "info");
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.joinCode}>{session.id}</div>

      <QRCode value={url} />

      <div onClick={copyToClipboard} className={styles.copyToClipboard}>
        Copy to Clipboard
      </div>
    </div>
  );
};
