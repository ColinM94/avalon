import { classes } from "utils/classes";
import { Heading } from "components/heading/heading";
import { CharacterCard } from "components/characterCard/characterCard";
import { CharacterId } from "types/general";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SetupCharacters = (props: Props) => {
  const {
    heading,
    characters,
    maxActiveCharacters,
    numActiveCharacters,
    allegiance,
    selectedCharacters,
    setCharacters,
    className,
  } = props;

  const handleCharacterClick = (characterId: CharacterId) => {
    const character = characters[characterId];
    const isSelected = selectedCharacters.includes(characterId);

    if (!character.isOptional) return;

    if (character.allegiance === allegiance && numActiveCharacters >= maxActiveCharacters && !isSelected) {
      return;
    }

    setCharacters((prev) => {
      if (!isSelected) return [...prev, character.id];
      return prev.filter((id) => id !== characterId);
    });
  };

  const filteredCharacters = characters.filter(
    (characterId) => characters[characterId].allegiance === allegiance && !characters[characterId].disabled,
  );

  return (
    <div className={classes(styles.container, className)}>
      <Heading
        headingTitle={heading}
        // headingSubtitle={`Select the characters for ${allegiance === "good" ? "Good" : "Evil"}`}
        rightText={`${numActiveCharacters}/${maxActiveCharacters}`}
      />

      <div className={styles.characters}>
        {filteredCharacters.map((characterId) => (
          <CharacterCard
            character={characters[characterId]}
            onClick={handleCharacterClick}
            showName
            isActive={selectedCharacters.includes(characterId)}
            key={characterId}
            orientation="portrait"
            showInfoButton
            className={styles.character}
          />
        ))}
      </div>
    </div>
  );
};
