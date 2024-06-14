import * as React from "react";

import { NameEditor } from "components";
import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const LobbyPlayers = (props: Props) => {
  const { session, playerId, className } = props;

  const [showNameEditor, setShowNameEditor] = React.useState(false);

  const players = Object.values(session.players).sort(
    (a, b) => a.joinedAt - b.joinedAt
  );

  return (
    <>
      <NameEditor
        sessionId={session.id}
        playerId={playerId}
        show={showNameEditor}
        nameDefault={session?.players?.[playerId]?.name || ""}
        setShow={setShowNameEditor}
      />

      <div className={styles.numPlayers}>
        {players.length} / {session?.numPlayers}
      </div>

      <div className={classes(styles.container, className)}>
        {players.map((player) => {
          const isCurrentPlayer = playerId === player.id;

          return (
            <div
              key={player.id}
              className={classes(
                styles.player,
                isCurrentPlayer && styles.currentPlayer
              )}
            >
              {isCurrentPlayer && (
                <div
                  onClick={() => setShowNameEditor(true)}
                  key={player.id}
                  className={styles.editButton}
                >
                  Edit
                </div>
              )}
              {player.name}

              {player.isReady && (
                <div className={styles.checkmark}>&#x2713;</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
