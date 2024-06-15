import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCode } from "react-qrcode-logo";

import { classes, shuffleArray } from "utils";
import { useToastStore } from "stores";
import { Button } from "components";
import { updateMyPlayer, updateSession } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";
import { baseUrl } from "consts";

export const PlayJoin = (props: Props) => {
  const { session, players, isHost, user, className } = props;

  const { showToast } = useToastStore();

  const url = `${baseUrl}/join/${session.id}`;

  console.log(baseUrl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    showToast("Url copied to clipboard", "info");
  };

  React.useEffect(() => {
    if (
      isHost &&
      players.length === session.numPlayers &&
      players.every((player) => player.isReady)
    ) {
      updateSession(session.id, {
        step: "characterReveal",
      });
    }
  }, [session.players]);

  const handleReady = () => {
    updateMyPlayer({
      isReady: true,
    });
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.joinCode}>{session.id}</div>

      <QRCode value={url} />

      <div onClick={copyToClipboard} className={styles.copyToClipboard}>
        Copy URL
        <FontAwesomeIcon icon="copy" className={styles.copyIcon} />
      </div>

      <Button
        label="Ready"
        onClick={handleReady}
        disabled={session.players[user.id].isReady}
        className={styles.readyButton}
      />
    </div>
  );
};
