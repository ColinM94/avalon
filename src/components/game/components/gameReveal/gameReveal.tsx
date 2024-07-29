import * as React from "react";

import { Button, CharacterCard } from "components";
import { classes } from "utils";
import { useSessionStore } from "stores";
import { goToStep } from "services";
import { charactersDefault } from "consts";

import styles from "./styles.module.scss";

export const GameReveal = () => {
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
    goToStep({
      step: "ritual",
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

  const validate = () => {
    if (!isCharacterRevealed) return "You must view your character first";
    return true;
  };

  React.useEffect(() => {
    updateSessionStore({ validateReady: validate });
  }, [isCharacterRevealed]);

  return (
    <>
      <CharacterCard
        character={charactersDefault[characterId]}
        showDescription
        showName
        alwaysActive
        className={classes(
          styles.character,
          !showCharacter && styles.characterHidden
        )}
      />

      <Button
        label={showCharacter ? "Hide Character" : "Reveal Character"}
        onClick={handleReveal}
        className={styles.revealButton}
      />
    </>
  );
};
