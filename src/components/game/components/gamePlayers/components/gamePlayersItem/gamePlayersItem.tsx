import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";

import { classes } from "utils";
import { NameEditor } from "components";
import { useAppStore } from "stores";
import { updateDocument } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GamePlayersItem = (props: Props) => {
  const { session, player, connected, isHost, className } = props;

  const { user } = useAppStore();

  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const isUser = player.id === user.id;
  const showKick = isHost && player.id !== user.id && connected;

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

  const isReady =
    (session.step === "lobby" && player.isReadyLobby) ||
    (session.step === "characterReveal" && player.isReadyCharacterReveal) ||
    (session.step === "ritual" && player.isReadyRitual);

  return (
    <>
      {player.id === user.id && (
        <NameEditor
          show={showNameEditor}
          setShow={setShowNameEditor}
          user={user}
          userId={user.id}
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
          isUser && styles.user
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

        {isUser && !player.name && (
          <FontAwesomeIcon icon="pencil" className={styles.editIcon} />
        )}

        {player.name}

        {isReady && (
          <FontAwesomeIcon icon="check" className={styles.readyIcon} />
        )}

        {/* {isUser && <div className={styles.editText}>Edit</div>} */}
      </div>
    </>
  );
};
