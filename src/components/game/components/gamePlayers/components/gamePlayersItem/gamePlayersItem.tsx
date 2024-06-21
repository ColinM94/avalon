import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";

import { classes } from "utils";
import { NameEditor } from "components";
import { updateDocument } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GamePlayersItem = (props: Props) => {
  const { session, player, myPlayer, connected, isHost, className } = props;

  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const isMyPlayer = player.id === myPlayer.id;
  const showKick = isHost && player.id !== myPlayer.id && connected;

  const handleKick = async () => {
    if (session.step !== "lobby") return;

    const shouldKick = confirm(`Are you sure you want to kick ${player.name}`);

    if (!shouldKick) return;

    await updateDocument({
      id: session.id,
      collection: "sessions",
      data: {
        [`players.${player.id}`]: deleteField(),
      },
    });
  };

  const handleClick = () => {
    if (showKick) handleKick();
    else setShowNameEditor(true);
  };

  return (
    <>
      {player.id === myPlayer.id && (
        <NameEditor
          myPlayer={myPlayer}
          show={showNameEditor}
          setShow={setShowNameEditor}
          session={session}
        />
      )}

      <div
        onClick={handleClick}
        className={classes(
          className,
          styles.container,
          connected && styles.connected,
          player.isHost && styles.host,
          isMyPlayer && styles.user
        )}
      >
        {player.isHost && styles.hostIcon && (
          <FontAwesomeIcon icon="crown" className={styles.hostIcon} />
        )}

        {showKick && session.step === "lobby" && (
          <FontAwesomeIcon icon="x" className={styles.kickIcon} />
        )}

        {!connected && (
          <FontAwesomeIcon icon="hourglass" className={styles.waitingIcon} />
        )}

        {isMyPlayer && !player.name && (
          <FontAwesomeIcon icon="pencil" className={styles.editIcon} />
        )}

        {player.name}

        {player.isReady && (
          <FontAwesomeIcon icon="check" className={styles.readyIcon} />
        )}
      </div>
    </>
  );
};
