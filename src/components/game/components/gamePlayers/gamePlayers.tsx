import { classes } from "utils";
import { playerDefault } from "consts";
import { useSessionStore } from "stores";

import { GamePlayersItem } from "./components/gamePlayersItem/gamePlayersItem";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GamePlayers = (props: Props) => {
  const { className } = props;

  const { players, session } = useSessionStore();

  const renderPlayers = () => {
    const items = [];

    const tempPlayers = Object.values(players).sort(
      (a, b) => a.joinedAt - b.joinedAt
    );

    for (let i = 0; i < session.numPlayers; i++) {
      const tempPlayer = tempPlayers[i] || playerDefault();

      items.push(
        <GamePlayersItem
          player={tempPlayer}
          connected={!!tempPlayers[i]}
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
