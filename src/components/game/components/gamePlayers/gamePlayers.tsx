import { classes } from "utils";
import { playerDefault } from "consts";

import { GamePlayersItem } from "./components/gamePlayersItem/gamePlayersItem";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GamePlayers = (props: Props) => {
  const { state, className } = props;

  const renderPlayers = () => {
    const items = [];

    for (let i = 0; i < state.session.numPlayers; i++) {
      const tempPlayer = state.players[i] || playerDefault();

      items.push(
        <GamePlayersItem
          state={state}
          player={tempPlayer}
          connected={!!state.players[i]}
          key={i}
          isHost={state.isHost}
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
