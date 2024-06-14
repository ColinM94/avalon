import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SetupOptions = (props: Props) => {
  const { session, updateSession, headingClassName } = props;

  const { numPlayers } = session;

  return (
    <div className={styles.container}>
      {/* <div className={headingClassName}>Name</div>

      <InputText
        value={session.name}
        setValue={(value) => updateSession({ name: value })}
      /> */}

      <div className={headingClassName}>Number of Players</div>

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
