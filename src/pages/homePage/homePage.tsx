import * as React from "react";

import { CharacterCard, InputNumber } from "components";
import { reactReducer } from "utils";
import { Characters } from "types";

import { charactersDefault, maxCharacters } from "./data";
import styles from "./styles.module.scss";

export const HomePage = () => {
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

    // if(character.allegiance === "good" && )

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>Avalon Ritual Setup</div>
        {/* <div className={styles.numSelected}>
          ({numActiveCharacters}) selected
        </div> */}
      </div>

      <div className={styles.numPlayersSection}>
        <div className={styles.sectionHeading}>Number of Players</div>

        <InputNumber
          value={numPlayers}
          setValue={setNumPlayers}
          min={5}
          max={10}
          className={styles.numPlayersInput}
        />
      </div>

      <div className={styles.sectionHeading}>
        Good Characters {numActiveGoodCharacters}/{maxGood}
      </div>

      <div className={styles.characters}>
        {goodCharacters.map((character) => (
          <CharacterCard
            character={character}
            onClick={handleCharacterClick}
            className={styles.character}
          />
        ))}
      </div>

      <div className={styles.sectionHeading}>
        Evil Characters {numActiveEvilCharacters}/{maxEvil}
      </div>

      <div className={styles.characters}>
        {evilCharacters.map((character) => (
          <CharacterCard
            character={character}
            onClick={handleCharacterClick}
            className={styles.character}
          />
        ))}
      </div>
    </div>
  );
};
