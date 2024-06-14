import { classes } from "utils";
import { playerDefault } from "consts";

import { PlayersPlayer } from "./components/playersPlayer/playersPlayer";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const PlayPlayers = (props: Props) => {
  const { session, players, className } = props;

  const renderPlayers = () => {
    const items = [];

    for (let i = 0; i < session.numPlayers; i++) {
      const tempPlayer = players[i] || playerDefault();

      items.push(
        <PlayersPlayer
          player={tempPlayer}
          isHost={tempPlayer.isHost}
          connected={!!players[i]}
          key={i}
        />
      );
    }

    return items;
  };

  return (
    <div className={classes(styles.container, className)}>
      {renderPlayers()}
    </div>
  );
};
