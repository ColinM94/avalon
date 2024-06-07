import * as React from "react";

import { Button, CharacterCard, Header } from "components";
import { Characters } from "types";
import { classes, reactReducer } from "utils";

import styles from "./styles.module.scss";
import { charactersDefault, maxCharacters } from "./data";

export const SetupPage = () => {
  const [characters, udpateCharacters] =
    reactReducer<Characters>(charactersDefault);

  const [numPlayers, setNumPlayers] = React.useState(5);

  const numActiveCharacters = React.useMemo(() => {
    return Object.values(characters).filter((character) => character.isActive)
      .length;
  }, [characters]);

  const numActiveGoodCharacters = React.useMemo(() => {
    return Object.values(characters).filter(
      (character) => character.allegiance === "good" && character.isActive
    ).length;
  }, [characters]);

  const numActiveEvilCharacters = React.useMemo(() => {
    return Object.values(characters).filter(
      (character) => character.allegiance === "evil" && character.isActive
    ).length;
  }, [characters]);

  const maxEvil = maxCharacters[numPlayers].evil;
  const maxGood = maxCharacters[numPlayers].good;

  const handleCharacterClick = (characterId: string) => {
    const character = characters[characterId];

    if (!character.isOptional) return;

    if (
      character.allegiance === "good" &&
      !characters[characterId].isActive &&
      numActiveGoodCharacters >= maxGood
    ) {
      return;
    }

    if (
      character.allegiance === "evil" &&
      !characters[characterId].isActive &&
      numActiveEvilCharacters >= maxEvil
    ) {
      return;
    }

    udpateCharacters({
      [characterId]: {
        ...character,
        isActive: !characters[characterId].isActive,
      },
    });
  };

  const goodCharacters = React.useMemo(() => {
    return Object.values(characters).filter(
      (character) => character.allegiance === "good"
    );
  }, [characters]);

  const evilCharacters = React.useMemo(() => {
    return Object.values(characters).filter(
      (character) => character.allegiance === "evil"
    );
  }, [characters]);

  const handleContinue = () => {};

  return (
    <>
      <Header heading="Avalon Setup" />

      <div className={styles.section}>
        <div className={styles.sectionHeading}>Number of Players</div>

        <div className={styles.numPlayersOption}>
          {[5, 6, 7, 8, 9, 10].map((num) => (
            <div
              onClick={() => setNumPlayers(num)}
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
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeading}>
          Good Characters {numActiveGoodCharacters}/{maxGood}
        </div>

        <div className={styles.characters}>
          {goodCharacters.map((character) => (
            <CharacterCard
              character={character}
              onClick={handleCharacterClick}
              key={character.id}
              className={styles.character}
            />
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeading}>
          Evil Characters {numActiveEvilCharacters}/{maxEvil}
        </div>

        <div className={styles.characters}>
          {evilCharacters.map((character) => (
            <CharacterCard
              character={character}
              onClick={handleCharacterClick}
              key={character.id}
              className={styles.character}
            />
          ))}
        </div>
      </div>

      <Button
        label="Continue"
        onClick={handleContinue}
        className={styles.continueButton}
      />
    </>
  );
};
