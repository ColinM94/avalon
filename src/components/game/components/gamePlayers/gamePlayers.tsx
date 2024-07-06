import { classes } from "utils";
import { playerDefault } from "consts";
import { useSessionStore } from "stores";
import { PlayerCard } from "components";

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

      items.push(<PlayerCard player={tempPlayer} />);
    }

    return items;
  };

  return (
    <div className={classes(styles.container, className)}>
      {renderPlayers()}
    </div>
  );
};
