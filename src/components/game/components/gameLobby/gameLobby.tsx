import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QRCode } from "react-qrcode-logo";

import { classes } from "utils";
import { useSessionStore, useToastStore } from "stores";
import { baseUrl } from "consts";
import { Player } from "types";
import { Divider, NameEditor, PlayerCard, ReadyButton } from "components";
import { updateSession } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameLobby = (props: Props) => {
  const { className } = props;
  const { showToast } = useToastStore();
  const {
    session,
    isAllReady,
    isMyPlayerHost,
    playersArray,
    myPlayer,
    updateSessionStore,
  } = useSessionStore();

  const [showEditor, setShowEditor] = React.useState(false);

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

  React.useEffect(() => {
    updateSessionStore({
      heading: {
        title: "Avalon",
      },
    });
  }, []);

  const players = () => {
    const tempPlayers = [];

    for (let i = 0; i < session.numPlayers; i++) {
      if (playersArray[i]?.id === myPlayer.id) continue;

      if (!playersArray[i]) {
        tempPlayers.push(
          <PlayerCard connected={false} className={styles.player} />
        );

        continue;
      }

      tempPlayers.push(
        <PlayerCard
          player={playersArray[i]}
          showName
          className={styles.player}
        />
      );
    }

    return tempPlayers;
  };

  return (
    <div className={classes(styles.container, className)}>
      <NameEditor show={showEditor} setShow={setShowEditor} />

      <div className={styles.joinCode}>{session.id}</div>

      <QRCode value={url} />

      <div onClick={copyToClipboard} className={styles.copyToClipboard}>
        Copy URL
        <FontAwesomeIcon icon="copy" className={styles.copyIcon} />
      </div>

      <ReadyButton />

      <Divider label="Players" className={styles.divider} />

      <div onClick={() => setShowEditor(true)} className={styles.profile}>
        {myPlayer.imageUrl && (
          <img src={myPlayer.imageUrl} className={styles.image} />
        )}

        <FontAwesomeIcon icon="pencil" className={styles.profileEditIcon} />

        {!myPlayer.imageUrl && (
          <FontAwesomeIcon icon="user" className={styles.photoIcon} />
        )}

        <div className={styles.profileName}>Player 1</div>
      </div>

      <div className={styles.players}>{players()}</div>
    </div>
  );
};
