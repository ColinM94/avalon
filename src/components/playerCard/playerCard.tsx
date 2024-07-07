import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";

import { classes } from "utils";
import { NameEditor } from "components";
import { updateSession } from "services";
import { useSessionStore } from "stores";
import { GameSession } from "types";
// import myFace from "assets/images/myFace.jpg";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const PlayerCard = (props: Props) => {
  const { player, connected = true, onClick, showName, className } = props;

  const { myPlayer, activeQuest, isMyPlayerHost, session } = useSessionStore();

  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const isMyPlayer = player?.id === myPlayer.id;
  const showKick = isMyPlayerHost && player?.id !== myPlayer.id && connected;
  const isLeader =
    activeQuest && activeQuest.leaderId && activeQuest?.leaderId === player?.id;

  const handleKick = async () => {
    if (session.step !== "lobby") return;

    const shouldKick = confirm(`Are you sure you want to kick ${player?.name}`);

    if (!shouldKick) return;

    await updateSession({
      [`players.${player?.id}`]: deleteField(),
    });
  };

  const handleClick = () => {
    onClick?.();

    if (session.step !== "lobby") return;

    if (showKick) handleKick();
    else setShowNameEditor(true);
  };

  return (
    <>
      {player?.id === myPlayer.id && (
        <NameEditor show={showNameEditor} setShow={setShowNameEditor} />
      )}

      <div
        onClick={handleClick}
        className={classes(
          className,
          styles.container,
          connected && styles.connected,
          player?.isMyPlayerHost && styles.host,
          isMyPlayer && styles.user
        )}
      >
        {player?.imageUrl && (
          <img src={player.imageUrl} className={styles.image} />
        )}

        {isLeader && (
          <FontAwesomeIcon icon="crown" className={styles.hostIcon} />
        )}

        {showKick && session.step === "lobby" && (
          <FontAwesomeIcon icon="x" className={styles.kickIcon} />
        )}

        {connected === false && (
          <FontAwesomeIcon icon="hourglass" className={styles.waitingIcon} />
        )}

        {/* {isMyPlayer && session.step === "lobby" && (
          <FontAwesomeIcon icon="pencil" className={styles.editIcon} />
        )} */}

        {showName && player?.name && (
          <div className={styles.name}>{player.name}</div>
        )}

        {player?.isReady &&
          (
            ["lobby", "characterReveal", "ritual"] as GameSession["step"][]
          ).includes(session.step) && (
            <FontAwesomeIcon icon="check" className={styles.readyIcon} />
          )}
      </div>
    </>
  );
};
