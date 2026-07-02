import * as React from "react";

import { Button } from "components/button/button";
import { CharacterCard } from "components/characterCard/characterCard";
import { MenuBar } from "components/menuBar/menuBar";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { classes } from "utils/classes";
import { charactersDefault } from "consts/defaults";
import { revealCanContinue, revealCanReady, revealContinue, revealReady } from "services/session/logic";
import { PlayerCard } from "components/playerCard/playerCard";
import { characterNames } from "consts/characters";
import { CharacterId } from "types/general";

import styles from "./styles.module.scss";

export const GameReveal = () => {
  const { myPlayer, isMyPlayerHost, players } = useSessionStore();

  const [showCharacter, setShowCharacter] = React.useState(false);
  const [isCharacterRevealed, setIsCharacterRevealed] = React.useState(false);

  // const characterId = players?.[myPlayer.id]?.characterId;

  const handleReveal = () => {
    setIsCharacterRevealed(true);
    setShowCharacter(!showCharacter);
  };

  const allPlayers = Object.values(players);

  const evilPlayers = Object.values(allPlayers).filter(
    (player) => charactersDefault[player.characterId].allegiance === "evil",
  );

  const evilPlayersExceptMordred = evilPlayers.filter((player) => player.id !== "mordred");

  const merlinAndMorganaPlayers = allPlayers.filter(
    (player) => player.characterId === "morgana" || player.characterId === "merlin",
  );

  const evilPlayersExceptOberon = evilPlayers.filter((player) => player.characterId !== "oberon");

  const isMordredPlaying = allPlayers.find((player) => player.characterId === "mordred");
  const isMorganaPlaying = allPlayers.find((player) => player.characterId === "morgana");

  const characterId: CharacterId = "percival";
  const character = charactersDefault[characterId];

  return (
    <>
      <div className={classes(styles.container, !showCharacter && styles.hidden)}>
        <div className={styles.characterName}>{characterNames[characterId]}</div>

        <CharacterCard
          character={charactersDefault[characterId]}
          // showDescription
          // showName
          alwaysActive
          // orientation="landscape"
          className={styles.character}
        />

        <div className={styles.howToPlay}>{charactersDefault[characterId].howToPlay}</div>

        <div className={styles.section}>
          {character.id === "merlin" && (
            <>
              {isMordredPlaying && (
                <div className={styles.sectionHeading}>These are the evil players, except Mordred is missing.</div>
              )}
              {!isMordredPlaying && <div className={styles.sectionHeading}>These are the evil players:</div>}
              <div className={styles.playerCards}>
                {evilPlayersExceptMordred.map((player) => (
                  <PlayerCard player={player} showName />
                ))}
              </div>
            </>
          )}

          {character.id === "percival" && (
            <>
              {isMorganaPlaying && (
                <div className={styles.sectionHeading}>
                  One of these players is Merlin, and one is Morgana. Which is which, is up to you to find out:
                </div>
              )}
              {!isMorganaPlaying && <div className={styles.sectionHeading}>Merlin:</div>}

              <div className={styles.playerCards}>
                {merlinAndMorganaPlayers.map((player) => (
                  <PlayerCard player={player} showName />
                ))}
              </div>
            </>
          )}

          {character.allegiance === "evil" && (
            <div className={styles.playerCards}>
              {evilPlayersExceptOberon.map((player) => (
                <PlayerCard player={player} showName />
              ))}
            </div>
          )}
        </div>

        {/* {characterId === "merlin" && (
          <div className={styles.section}>
            <div className={styles.sectionHeading}>You are an Agent of Evil. Here are the other Asians of Evil.</div>

            <div className={styles.playerCards}>
              {evilPlayers().map((player) => (
                <PlayerCard player={player} showName />
              ))}
            </div>
          </div>
        )} */}
      </div>

      <Button
        label={showCharacter ? "Hide Character" : "Reveal Character"}
        onClick={handleReveal}
        className={styles.revealButton}
      />

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={() => revealCanContinue(isCharacterRevealed)}
        onContinue={revealContinue}
        canReady={() => revealCanReady(isCharacterRevealed)}
        onReady={() => revealReady(myPlayer.id)}
      />
    </>
  );
};
