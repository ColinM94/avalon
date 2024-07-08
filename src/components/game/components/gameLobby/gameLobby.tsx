import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCode } from "react-qrcode-logo";

import { classes } from "utils";
import { useSessionStore, useToastStore } from "stores";
import { baseUrl } from "consts";
import { Player } from "types";
import { ReadyButton } from "components";
import { updateMyPlayer, updateSession } from "services";

import { GameLobbyProfile } from "./components/gameLobbyProfile/gameLobbyProfile";
import { GamePlayers } from "../gamePlayers/gamePlayers";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameLobby = (props: Props) => {
  const { className } = props;

  const { showToast } = useToastStore();
  const { session, isAllReady, isMyPlayerHost, myPlayer, updateSessionStore } =
    useSessionStore();

  const url = `${baseUrl}/join/${session.id}`;

  const handleCopy = () => {
    navigator.share({
      title: "Join my game of Avalon",
      url,
    });
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

  React.useEffect(() => {
    updateSessionStore({
      heading: {
        title: "Avalon",
      },
    });
  }, []);

  const handleReady = () => {
    if (!myPlayer.name) showToast("You must choose a name");
    // if (!myPlayer.imageUrl) showToast("Please take a photo");
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.lobbyInfo}>
        <div onClick={handleCopy} className={styles.lobbyInfoText}>
          <div className={styles.joinCode}>{session.id}</div>

          <FontAwesomeIcon
            icon="share-nodes"
            className={styles.lobbyInfoTextCopyIcon}
          />
        </div>

        <QRCode value={url} />
      </div>
      {/* <Divider label="Your Profile" /> */}

      <GameLobbyProfile className={styles.editor} />

      <ReadyButton disabled={!myPlayer.name} onClickDisabled={handleReady} />

      <GamePlayers showEmptySlots showMyPlayer />
    </div>
  );
};
