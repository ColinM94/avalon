import { classes } from "utils";
import { playerDefault } from "consts";

import { PlayersPlayer } from "./components/playersPlayer/playersPlayer";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const PlayPlayers = (props: Props) => {
  const { session, players, isHost, className } = props;

  const renderPlayers = () => {
    const items = [];

    for (let i = 0; i < session.numPlayers; i++) {
      const tempPlayer = players[i] || playerDefault();

      items.push(
        <PlayersPlayer
          player={tempPlayer}
          session={session}
          connected={!!players[i]}
          key={i}
          isHost={isHost}
        />
      );
    }

    return items;
  };

  <div>Click your player to edit the name</div>;

  return (
    <div className={classes(styles.container, className)}>
      {renderPlayers()}
    </div>
  );
};
