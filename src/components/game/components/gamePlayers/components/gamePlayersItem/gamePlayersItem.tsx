import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";

import { classes } from "utils";
import { NameEditor } from "components";
import { updateSession } from "services";
import { useSessionStore } from "stores";
import { GameSession } from "types";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GamePlayersItem = (props: Props) => {
  const { player, connected, className } = props;

  const { myPlayer, activeQuest, isHost, session } = useSessionStore();

  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const isMyPlayer = player.id === myPlayer.id;
  const showKick = isHost && player.id !== myPlayer.id && connected;
  const isLeader =
    activeQuest && activeQuest.leaderId && activeQuest?.leaderId === player.id;

  const handleKick = async () => {
    if (session.step !== "lobby") return;

    const shouldKick = confirm(`Are you sure you want to kick ${player.name}`);

    if (!shouldKick) return;

    await updateSession({
      [`players.${player.id}`]: deleteField(),
    });
  };

  const handleClick = () => {
    if (session.step !== "lobby") return;

    if (showKick) handleKick();
    else setShowNameEditor(true);
  };

  return (
    <>
      {player.id === myPlayer.id && (
        <NameEditor show={showNameEditor} setShow={setShowNameEditor} />
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
        {isLeader && (
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

        {player.isReady &&
          (["lobby", "characterReveal"] as GameSession["step"][]).includes(
            session.step
          ) && <FontAwesomeIcon icon="check" className={styles.readyIcon} />}
      </div>
    </>
  );
};
