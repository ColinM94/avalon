import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCode } from "react-qrcode-logo";

import { classes } from "utils";
import { useSessionStore, useToastStore } from "stores";
import { baseUrl } from "consts";
import { Player } from "types";
import { ReadyButton } from "components";
import { updateSession } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameLobby = (props: Props) => {
  const { className } = props;
  const { showToast } = useToastStore();
  const { session, isAllReady, isMyPlayerHost } = useSessionStore();

  const url = `${baseUrl}/join/${session.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    showToast("Url copied to clipboard", "info");
  };

  React.useEffect(() => {
    (async () => {
      if (!isMyPlayerHost || !isAllReady) return;

      const updatedPlayers: Record<string, Player> = {};

      Object.values(session.players).forEach((player, index) => {
        updatedPlayers[player.id] = {
          ...player,
          characterId: session.characters[index],
          isReady: false,
        };
      });

      updateSession({
        players: updatedPlayers,
        step: "characterReveal",
      });
    })();
  }, [isAllReady]);

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.joinCode}>{session.id}</div>

      <QRCode value={url} />

      <div onClick={copyToClipboard} className={styles.copyToClipboard}>
        Copy URL
        <FontAwesomeIcon icon="copy" className={styles.copyIcon} />
      </div>

      <ReadyButton />
    </div>
  );
};
