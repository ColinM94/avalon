import { classes } from "utils/classes";
import { Heading } from "components/heading/heading";
import { CharacterCard } from "components/characterCard/characterCard";
import { charactersDefault } from "consts/defaults";
import { CharacterId } from "types/general";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SetupCharacters = (props: Props) => {
  const { heading, characters, maxActiveCharacters, numActiveCharacters, allegiance, setCharacters, className } = props;

  const handleCharacterClick = (characterId: CharacterId) => {
    const character = charactersDefault[characterId];

    if (!character.isOptional) return;

    if (character.allegiance === allegiance && numActiveCharacters >= maxActiveCharacters) {
      return;
    }

    setCharacters((prev) => {
      if (prev.includes(characterId)) return prev.filter((id) => id !== characterId);
      return [...prev, characterId];
    });
  };

  const filteredCharacters = characters.filter(
    (characterId) =>
      charactersDefault[characterId].allegiance === allegiance && !charactersDefault[characterId].disabled,
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
            character={charactersDefault[characterId]}
            onClick={handleCharacterClick}
            showName
            isActive={characters.includes(characterId)}
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
