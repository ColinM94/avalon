import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCode } from "react-qrcode-logo";

import { classes } from "utils";
import { useToastStore } from "stores";
import { Button } from "components";
import { updatePlayer } from "services";
import { baseUrl } from "consts";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameJoin = (props: Props) => {
  const { session, players, isHost, user, className } = props;

  const { showToast } = useToastStore();

  const url = `${baseUrl}/join/${session.id}`;

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
      handleAllReady();
    }
  }, [session.players]);

  const handleAllReady = async () => {
    for (let i = 0; i < players.length; i++) {
      await updatePlayer(user.id, session, {
        characterId: session.characters[i],
      });
    }
  };

  const handleReady = () => {
    updatePlayer(user.id, session, {
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
