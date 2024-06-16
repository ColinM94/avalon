import * as React from "react";

import { Button, CharacterRevealer } from "components";
import { useAppStore } from "stores";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameReveal = (props: Props) => {
  const { session, className } = props;

  const [showCharacter, setShowCharacter] = React.useState(false);

  const { user } = useAppStore();

  const characterId = session.players[user.id].characterId;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.description}>
          Do not let anyone see your screen!
        </div>

        <Button
          label="Reveal Character"
          onClick={() => setShowCharacter(true)}
          className={styles.revealButton}
        />
      </div>

      <CharacterRevealer
        characterId={characterId}
        show={showCharacter}
        setShow={setShowCharacter}
        // onReveal={() => setHasViewedCharacter(true)}
      />
    </>
  );
};
