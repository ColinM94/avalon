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

export const GameLobby = (props: Props) => {
  const { session, players, player, isHost, setIsReady, className } = props;

  const { showToast } = useToastStore();

  const url = `${baseUrl}/join/${session.id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    showToast("Url copied to clipboard", "info");
  };

  const isAllReady = players.every((player) => player.isReady);

  React.useEffect(() => {
    if (isHost && isAllReady) handleAllReady();
  }, [isAllReady]);

  const handleAllReady = async () => {
    const updatedPlayers: Record<string, Player> = {};

    players.forEach((player, index) => {
      updatedPlayers[player.id] = {
        ...player,
        characterId: session.characters[index],
        isReady: false,
      };
    });

    await updateDocument<GameSession>({
      id: session.id,
      collection: "sessions",
      data: {
        step: "characterReveal",
        players: updatedPlayers,
      },
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

      <ReadyButton isReady={player.isReady} onClick={setIsReady} />
    </div>
  );
};
