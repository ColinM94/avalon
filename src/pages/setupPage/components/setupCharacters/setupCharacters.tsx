import { CharacterCard, Heading } from "components";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SetupCharacters = (props: Props) => {
  const {
    heading,
    characters,
    maxActiveCharacters,
    numActiveCharacters,
    allegiance,
    updateCharacters,
  } = props;

  const handleCharacterClick = (characterId: string) => {
    const character = characters[characterId];

    if (!character.isOptional) return;

    if (
      character.allegiance === allegiance &&
      !characters[characterId].isActive &&
      numActiveCharacters >= maxActiveCharacters
    ) {
      return;
    }

    updateCharacters({
      [characterId]: {
        ...character,
        isActive: !characters[characterId].isActive,
      },
    });
  };

  const filteredCharacters = Object.values(characters).filter(
    (character) => character.allegiance === allegiance && !character.disabled
  );

  return (
    <div className={styles.container}>
      <Heading
        headingTitle={heading}
        rightText={`${numActiveCharacters}/${maxActiveCharacters}`}
      />

      <div className={styles.characters}>
        {filteredCharacters.map((character) => (
          <CharacterCard
            character={character}
            onClick={handleCharacterClick}
            showName
            key={character.id}
            orientation="portrait"
            className={styles.character}
          />
        ))}
      </div>
    </div>
  );
};
