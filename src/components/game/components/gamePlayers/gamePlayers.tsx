import { classes } from "utils";
import { useSessionStore } from "stores";
import { Divider, PlayerCard } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GamePlayers = (props: Props) => {
  const { showDivider, showEmptySlots, showMyPlayer, className } = props;

  const { players, myPlayer, session } = useSessionStore();

  const renderPlayers = () => {
    const items = [];

    const tempPlayers = Object.values(players).sort(
      (a, b) => a.joinedAt - b.joinedAt
    );

    for (let i = 0; i < session.numPlayers; i++) {
      const tempPlayer = tempPlayers?.[i];

      if (showEmptySlots && !tempPlayer) {
        items.push(
          <PlayerCard key={i} connected={false} className={styles.player} />
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
