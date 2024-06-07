import * as React from "react";

import { CharacterCard } from "components";
import { reactReducer } from "utils";
import { Characters } from "types";

import { charactersDefault } from "./data";
import styles from "./styles.module.scss";

export const HomePage = () => {
  const [characters, udpateCharacters] =
    reactReducer<Characters>(charactersDefault);

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

  const handleCharacterClick = (characterId: string) => {
    const character = characters[characterId];

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
        <div className={styles.heading}>Pick your characters 0/6</div>
        <div className={styles.numSelected}>
          ({numActiveCharacters}) selected
        </div>
      </div>

      <div className={styles.charactersHeading}>
        Good Characters {numActiveGoodCharacters}/4
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

      <div className={styles.charactersHeading}>
        Evil Characters {numActiveEvilCharacters}/6
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
