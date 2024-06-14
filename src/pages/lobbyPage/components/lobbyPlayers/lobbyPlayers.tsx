import * as React from "react";

import { NameEditor } from "components";
import { classes } from "utils";
import { useAppStore } from "stores";
import { Player } from "types";
import { kickPlayer } from "services/session/kickPlayer";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const LobbyPlayers = (props: Props) => {
  const { session, userId, className } = props;

  const { user } = useAppStore();

  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const isHost = session.createdBy === user.id;

  const players = Object.values(session?.players)
    .filter((player) => player.isHost !== true)
    .sort((a, b) => a.joinedAt - b.joinedAt);

  const handleKick = (player: Player) => {
    const shouldKick = prompt(`Are you sure you want to kick ${player.name}`);
    if (shouldKick) kickPlayer(player.id);
  };

  return (
    <>
      <NameEditor
        userId={userId}
        show={showNameEditor}
        nameDefault={user.name}
        setShow={setShowNameEditor}
      />

      <div className={styles.numPlayers}>
        {players.length} / {session?.numPlayers}
      </div>

      <div className={classes(styles.container, className)}>
        {players.map((player) => {
          const isCurrentPlayer = userId === player.id;

          return (
            <div
              key={player.id}
              onClick={
                isCurrentPlayer ? () => setShowNameEditor(true) : undefined
              }
              className={classes(
                styles.player,
                isCurrentPlayer && styles.currentPlayer
              )}
            >
              {isCurrentPlayer && <div className={styles.editButton}>Edit</div>}

              {player.name}

              {player.isReady && (
                <div className={styles.checkmark}>&#x2713;</div>
              )}

              {isHost && player.id !== user.id && (
                <div
                  onClick={() => handleKick(player)}
                  className={styles.kickButton}
                >
                  Kick
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
