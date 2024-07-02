import { classes } from "utils";
import { Heading, InputCheckbox } from "components";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SetupOptions = (props: Props) => {
  const { session, updateSession } = props;

  return (
    <div className={styles.container}>
      <InputCheckbox
        value={session.isHostPlaying}
        setValue={(value) => updateSession({ isHostPlaying: value })}
        heading="Is this device playing?"
        headingSubtitle={
          session.isHostPlaying
            ? "This device will be used by a player e.g. Phone."
            : "This device will not be used by a player e.g. Computer connected to a TV."
        }
        className={styles.isHostPlayingInput}
      />

      <Heading
        headingTitle="Players"
        headingSubtitle="The number of people who will be playing"
      />

      <div className={styles.numPlayersOptions}>
        {[5, 6, 7, 8, 9, 10].map((num) => (
          <div
            onClick={() => updateSession({ numPlayers: num })}
            key={num}
            className={classes(
              styles.numPlayersOption,
              session.numPlayers === num && styles.numPlayersOptionActive
            )}
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};
