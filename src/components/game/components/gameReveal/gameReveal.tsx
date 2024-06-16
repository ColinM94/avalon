import * as React from "react";

import { Button, CharacterCard } from "components";
import { charactersDefault } from "consts";
import { updateDocument, updatePlayer } from "services";
import { GameSession } from "types";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameReveal = (props: Props) => {
  const { session, user, players, isHost, className } = props;

  const [showCharacter, setShowCharacter] = React.useState(false);
  const [isCharacterRevealed, setIsCharacterRevealed] = React.useState(false);

  const characterId = session.players[user.id].characterId;

  const isAllReady = players.every((player) => player.isReadyCharacterReveal);

  const handleReveal = () => {
    setIsCharacterRevealed(true);
    setShowCharacter(!showCharacter);
  };

  const handleReady = () => {
    updatePlayer(user.id, session, {
      isReadyCharacterReveal: true,
    });
  };

  const handleAllReady = async () => {
    await updateDocument<GameSession>({
      id: session.id,
      collection: "sessions",
      data: {
        step: "ritual",
      },
    });
  };

  React.useEffect(() => {
    if (isHost && isAllReady) handleAllReady();
  }, [isAllReady]);

  return (
    <div className={styles.container}>
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
        onClick={handleReady}
        disabled={
          !isCharacterRevealed ||
          session.players[user.id].isReadyCharacterReveal
        }
        className={styles.readyButton}
      />
    </div>
  );
};
