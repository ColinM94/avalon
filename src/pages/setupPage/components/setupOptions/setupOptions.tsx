import { classes } from "utils";
import { Heading } from "components";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SetupOptions = (props: Props) => {
  const { session, updateSession } = props;

  const { numPlayers } = session;

  return (
    <div className={styles.container}>
      <Heading headingTitle="Number of Players" />

      <div className={styles.numPlayersOptions}>
        {[5, 6, 7, 8, 9, 10].map((num) => (
          <div
            onClick={() => updateSession({ numPlayers: num })}
            key={num}
            className={classes(
              styles.numPlayersOption,
              numPlayers === num && styles.numPlayersOptionActive
            )}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};
