import { classes } from "utils";
import { InputText } from "components";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SetupOptions = (props: Props) => {
  const { lobby, updateLobby, headingClassName } = props;

  const { numPlayers } = lobby;

  return (
    <>
      <div className={headingClassName}>Name</div>

      <InputText
        value={lobby.name}
        setValue={(value) => updateLobby({ name: value })}
      />

      <div className={headingClassName}>Number of Players</div>

      <div className={styles.numPlayersOptions}>
        {[5, 6, 7, 8, 9, 10].map((num) => (
          <div
            onClick={() => updateLobby({ numPlayers: num })}
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
    </>
  );
};
