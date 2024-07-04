import * as React from "react";

import { Button, CharacterModal, ReadyButton } from "components";
import { Player } from "types";
import { classes } from "utils";
import { useSessionStore } from "stores";
import { updateSession } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameReveal = (props: Props) => {
  const { className } = props;

  const { myPlayer, isMyPlayerHost, isAllReady, session, updateSessionStore } =
    useSessionStore();

  const [showCharacter, setShowCharacter] = React.useState(false);
  const [isCharacterRevealed, setIsCharacterRevealed] = React.useState(false);

  const characterId = session.players?.[myPlayer.id]?.characterId;

  const handleReveal = () => {
    setIsCharacterRevealed(true);
    setShowCharacter(!showCharacter);
  };

  const handleAllReady = async () => {
    const updatedPlayers: Record<string, Player> = {};

    Object.values(session.players).forEach((player) => {
      updatedPlayers[player.id] = {
        ...player,
        isReady: false,
      };
    });

    updateSession({
      step: "ritual",
      players: updatedPlayers,
    });
  };

  React.useEffect(() => {
    updateSessionStore({
      heading: {
        title: "Character Reveal",
        subtitle: "Don't let anyone see your character!",
      },
    });
  }, []);

  React.useEffect(() => {
    if (isMyPlayerHost && isAllReady) handleAllReady();
  }, [isAllReady]);

  return (
    <div className={classes(styles.container, className)}>
      <Button
        label={showCharacter ? "Hide Character" : "Reveal Character"}
        onClick={handleReveal}
        className={styles.revealButton}
      />

      <ReadyButton
        disabled={!isCharacterRevealed || session.players[myPlayer.id].isReady}
        className={styles.readyButton}
      />

      {characterId && (
        <CharacterModal
          headingTitle="This is your Character"
          headingSubtitle="Do not let anyone see your screen"
          characterId={characterId}
          show={showCharacter}
          setShow={setShowCharacter}
        />
      )}
    </div>
  );
};
