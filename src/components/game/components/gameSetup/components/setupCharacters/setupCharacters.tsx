import { CharacterCard, Heading } from "components"
import { classes } from "utils"

import styles from "./styles.module.scss"
import { Props } from "./types"

export const SetupCharacters = (props: Props) => {
  const { heading, characters, maxActiveCharacters, numActiveCharacters, allegiance, updateCharacters, className } =
    props

  const handleCharacterClick = (characterId: string) => {
    const character = characters[characterId]

    if (!character.isOptional) return

    if (
      character.allegiance === allegiance &&
      !characters[characterId].isActive &&
      numActiveCharacters >= maxActiveCharacters
    ) {
      return
    }

    updateCharacters({
      [characterId]: {
        ...character,
        isActive: !characters[characterId].isActive,
      },
    })
  }

  const filteredCharacters = Object.values(characters).filter(
    (character) => character.allegiance === allegiance && !character.disabled
  )

  return (
    <div className={classes(styles.container, className)}>
      <Heading
        headingTitle={heading}
        // headingSubtitle={`Select the characters for ${
        //   allegiance === "good" ? "Good" : "Evil"
        // }`}
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
            showInfoButton
            className={styles.character}
          />
        ))}
      </div>
    </div>
  )
}
