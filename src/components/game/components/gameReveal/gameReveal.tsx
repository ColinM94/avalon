import * as React from "react";

import { Button, CharacterCard } from "components";
import { charactersDefault } from "consts";
import { updateDocument, updatePlayer } from "services";
import { GameSession, Player } from "types";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameReveal = (props: Props) => {
  const { state, className } = props;

  const [showCharacter, setShowCharacter] = React.useState(false);
  const [isCharacterRevealed, setIsCharacterRevealed] = React.useState(false);

  const characterId = state.session.players[state.myPlayer.id].characterId;

  const handleReveal = () => {
    setIsCharacterRevealed(true);
    setShowCharacter(!showCharacter);
  };

  const handleReady = () => {
    updatePlayer(state.myPlayer.id, state.session, {
      isReadyCharacterReveal: true,
    });
  };

  const handleAllReady = async () => {
    const updatedPlayers: Record<string, Player> = {};

    state.players.forEach((player, index) => {
      updatedPlayers[player.id] = {
        ...player,
        isReady: false,
      };
    });

    await updateDocument<GameSession>({
      id: state.session.id,
      collection: "sessions",
      data: {
        step: "ritual",
        players: updatedPlayers,
      },
    });
  };

  React.useEffect(() => {
    if (state.isHost && state.isAllReady) handleAllReady();
  }, [state.isAllReady]);

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
          state.session.players[state.myPlayer.id].isReadyCharacterReveal
        }
        className={styles.readyButton}
      />
    </div>
  );
};
