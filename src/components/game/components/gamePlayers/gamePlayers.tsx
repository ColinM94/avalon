import { classes } from "utils";
import { playerDefault } from "consts";

import { GamePlayersItem } from "./components/gamePlayersItem/gamePlayersItem";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GamePlayers = (props: Props) => {
  const { session, players, isHost, myPlayer, className } = props;

  const renderPlayers = () => {
    const items = [];

    for (let i = 0; i < session.numPlayers; i++) {
      const tempPlayer = players[i] || playerDefault();

      items.push(
        <GamePlayersItem
          player={tempPlayer}
          myPlayer={myPlayer}
          session={session}
          connected={!!players[i]}
          key={i}
          isHost={isHost}
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
