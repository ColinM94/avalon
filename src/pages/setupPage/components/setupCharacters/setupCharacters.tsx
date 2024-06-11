import { CharacterCard } from "components";

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
    headingClassName,
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
    <>
      <div className={headingClassName}>
        {heading} {numActiveCharacters}/{maxActiveCharacters}
      </div>

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
    </>
  );
};
