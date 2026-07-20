import * as React from "react";

import { Button } from "components/button/button";
import { CharacterCard } from "components/characterCard/characterCard";
import { MenuBar } from "components/menuBar/menuBar";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { classes } from "utils/classes";
import { characters, characterNames } from "consts/characters";
import { revealCanContinue, revealCanReady, revealContinue, revealReady } from "services/session/logic";
import { PlayerCard } from "components/playerCard/playerCard";

import styles from "./styles.module.scss";

export const GameReveal = () => {
  const { myPlayer, isMyPlayerHost, players } = useSessionStore();

  const [showCharacter, setShowCharacter] = React.useState(false);
  const [isCharacterRevealed, setIsCharacterRevealed] = React.useState(false);

  console.log(characters, myPlayer.characterId);

  const characterId = players?.[myPlayer.id]?.characterId;
  const character = characters[characterId];

  const allPlayers = Object.values(players);

  const evilPlayers = Object.values(allPlayers).filter(
    (player) => characters[player.characterId].allegiance === "evil" && player.id !== myPlayer.id,
  );

  const evilPlayersExceptMordred = evilPlayers.filter((player) => player.id !== "mordred");

  const merlinAndMorganaPlayers = allPlayers.filter(
    (player) => player.characterId === "morgana" || player.characterId === "merlin",
  );

  const evilPlayersExceptOberon = evilPlayers.filter((player) => player.characterId !== "oberon");

  const isMordredPlaying = allPlayers.find((player) => player.characterId === "mordred");
  const isMorganaPlaying = allPlayers.find((player) => player.characterId === "morgana");
  const isOberonPlaying = allPlayers.find((player) => player.characterId === "oberon");

  // const characterId: CharacterId = "oberon";

  const handleReveal = () => {
    setIsCharacterRevealed(true);
    setShowCharacter(!showCharacter);
  };

  return (
    <>
      <div className={classes(styles.container, !showCharacter && styles.hidden)}>
        <div className={styles.characterName}>{characterNames[characterId]}</div>

        <CharacterCard character={characters[characterId]} className={styles.character} />

        <div className={styles.howToPlay}>{characters[characterId].howToPlay}</div>

        <div className={styles.section}>
          {character.id === "merlin" && (
            <>
              {isMordredPlaying && (
                <div className={styles.sectionHeading}>These are the evil players, except Mordred is missing.</div>
              )}

              {!isMordredPlaying && <div className={styles.sectionHeading}>These are the evil players:</div>}

              <div className={styles.playerCards}>
                {evilPlayersExceptMordred.map((player) => (
                  <PlayerCard player={player} showName key={player.id} />
                ))}
              </div>
            </>
          )}

          {character.id === "percival" && (
            <>
              {isMorganaPlaying && (
                <div className={styles.sectionHeading}>One of these players is Merlin, and one is Morgana:</div>
              )}

              {!isMorganaPlaying && <div className={styles.sectionHeading}>Merlin:</div>}

              <div className={styles.playerCards}>
                {merlinAndMorganaPlayers.map((player) => (
                  <PlayerCard player={player} showName key={player.id} />
                ))}
              </div>
            </>
          )}

          {character.allegiance === "evil" && character.id !== "oberon" && (
            <>
              {isOberonPlaying && (
                <div className={styles.sectionHeading}>These are the other evil players, except for Oberon:</div>
              )}

              {!isOberonPlaying && <div className={styles.sectionHeading}>These are the other evil players:</div>}

              <div className={styles.playerCards}>
                {evilPlayersExceptOberon.map((player) => (
                  <PlayerCard player={player} showName key={player.id} />
                ))}
              </div>
            </>
          )}
        </div>
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
