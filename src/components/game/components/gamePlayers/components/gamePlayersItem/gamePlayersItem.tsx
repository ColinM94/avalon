import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";

import { classes } from "utils";
import { NameEditor } from "components";
import { updateDocument } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GamePlayersItem = (props: Props) => {
  const { state, player, connected, isHost, className } = props;

  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const isMyPlayer = player.id === state.myPlayer.id;
  const showKick = isHost && player.id !== state.myPlayer.id && connected;

  const handleKick = async () => {
    if (state.session.step !== "lobby") return;

    const shouldKick = confirm(`Are you sure you want to kick ${player.name}`);

    if (!shouldKick) return;

    await updateDocument({
      id: state.session.id,
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
      {player.id === state.myPlayer.id && (
        <NameEditor
          myPlayer={state.myPlayer}
          show={showNameEditor}
          setShow={setShowNameEditor}
          session={state.session}
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

        {showKick && state.session.step === "lobby" && (
          <FontAwesomeIcon icon="x" className={styles.kickIcon} />
        )}

        {!connected && (
          <FontAwesomeIcon icon="hourglass" className={styles.waitingIcon} />
        )}

        {isMyPlayer && !player.name && (
          <FontAwesomeIcon icon="pencil" className={styles.editIcon} />
        )}

        {player.name}

        {player.isReady && state.session.step !== "quests" && (
          <FontAwesomeIcon icon="check" className={styles.readyIcon} />
        )}
      </div>
    </>
  );
};
