import * as React from "react";

import { Button, CharacterCard } from "components";
import { charactersDefault } from "consts";
import { Player } from "types";
import { classes } from "utils";
import { useSessionStore } from "stores";
import { updateMyPlayer, updateSession } from "services";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameReveal = (props: Props) => {
  const { className } = props;

  const { myPlayer, isHost, isAllReady, session } = useSessionStore();

  const [showCharacter, setShowCharacter] = React.useState(false);
  const [isCharacterRevealed, setIsCharacterRevealed] = React.useState(false);

  const characterId = session.players[myPlayer.id].characterId;

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
    if (isHost && isAllReady) handleAllReady();
  }, [isAllReady]);

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.description}>
        Do not let anyone see your character!
      </div>

      <CharacterCard
        character={charactersDefault[characterId]}
        showName
        disableAnimation
        showDescription
        alwaysActive
        orientation="landscape"
        revealed={showCharacter}
        className={styles.card}
      />

      <Button
        label={showCharacter ? "Hide Character" : "Reveal Character"}
        onClick={handleReveal}
        className={styles.revealButton}
      />

      <Button
        label="Ready"
        onClick={() => updateMyPlayer({ isReady: true })}
        disabled={!isCharacterRevealed || session.players[myPlayer.id].isReady}
        className={styles.readyButton}
      />
    </div>
  );
};
