import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCode } from "react-qrcode-logo";

import { classes } from "utils";
import { useToastStore } from "stores";
import { updateDocument } from "services";
import { baseUrl } from "consts";
import { GameSession, Player } from "types";
import { ReadyButton } from "components";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameLobby = ({ state, setIsReady, className }: Props) => {
  const { showToast } = useToastStore();

  const url = `${baseUrl}/join/${state.session.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    showToast("Url copied to clipboard", "info");
  };

  React.useEffect(() => {
    (async () => {
      if (!state.isHost || !state.isAllReady) return;

      const updatedPlayers: Record<string, Player> = {};

      state.players.forEach((player, index) => {
        updatedPlayers[player.id] = {
          ...player,
          characterId: state.session.characters[index],
          isReady: false,
        };
      });

      await updateDocument<GameSession>({
        id: state.session.id,
        collection: "sessions",
        data: {
          step: "characterReveal",
          players: updatedPlayers,
        },
      });
    })();
  }, [state.isAllReady]);

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.joinCode}>{state.session.id}</div>

      <QRCode value={url} />

      <div onClick={copyToClipboard} className={styles.copyToClipboard}>
        Copy URL
        <FontAwesomeIcon icon="copy" className={styles.copyIcon} />
      </div>

      <ReadyButton isReady={state.myPlayer.isReady} onClick={setIsReady} />
    </div>
  );
};
