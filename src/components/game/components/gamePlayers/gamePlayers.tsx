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

    for (let i = 0; i < session.numPlayers; i++) {
      const tempPlayer = players[i] || playerDefault("");

      items.push(
        <GamePlayersItem player={tempPlayer} connected={!!players[i]} key={i} />
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
