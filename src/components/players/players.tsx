import { classes } from "utils";
import { useSessionStore } from "stores";
import { Divider, PlayerCard } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Players = (props: Props) => {
  const {
    showDivider,
    showEmptySlots,
    showOnlyPlayersOnActiveQuest,
    showIsReady,
    width,
    playerIds,
    className,
  } = props;

  const { playersArray, players, session, activeQuest } = useSessionStore();

  const renderPlayers = () => {
    const items: React.ReactNode[] = [];

    const tempPlayers = playersArray.sort((a, b) => a.joinedAt - b.joinedAt);

    if (playerIds) {
      playerIds.forEach((playerId) => {
        items.push(
          <PlayerCard
            key={playerId}
            player={players[playerId]}
            showName
            width={width}
            showIsReady={showIsReady}
            className={styles.player}
          />
        );
      });

      return items;
    }

    if (showOnlyPlayersOnActiveQuest) {
      activeQuest.players.forEach((playerId) => {
        const player = players[playerId];

        items.push(
          <PlayerCard
            key={playerId}
            player={player}
            showName
            width={width}
            showIsReady={showIsReady}
            className={styles.player}
          />
        );
      });

      return items;
    }

    for (let i = 0; i < session.numPlayers; i++) {
      const tempPlayer = tempPlayers?.[i];

      if (showEmptySlots && !tempPlayer) {
        items.push(
          <PlayerCard
            key={i}
            connected={false}
            width={width}
            showIsReady={showIsReady}
            className={styles.player}
          />
        );

        continue;
      }

      if (!tempPlayer) return;

      items.push(
        <PlayerCard
          key={tempPlayer.id}
          player={tempPlayer}
          showName
          connected={!!tempPlayer.joinedAt}
          showLeaderIcon
          width={width}
          showIsReady={showIsReady}
          className={styles.player}
        />
      );
    }

    return items;
  };

  return (
    <>
      <div className={classes(styles.container, className)}>
        {showDivider && <Divider label="Players" />}
        {renderPlayers()}
      </div>
    </>
  );
};
