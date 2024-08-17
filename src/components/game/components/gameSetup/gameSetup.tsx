import { MenuBar, StepDescription } from "components"
import { Characters, Player } from "types"
import { reactReducer, shuffleArray } from "utils"
import { charactersDefault, maxCharacters } from "consts"
import { useAppStore, useSessionStore, useToastStore } from "stores"
import { goToStep } from "services"

import { SetupCharacters } from "./components/setupCharacters/setupCharacters"

import styles from "./styles.module.scss"

export const GameSetup = () => {
  const { showToast } = useToastStore()
  const { user } = useAppStore()
  const { session, isMyPlayerHost, playersArray } = useSessionStore()

  const [characters, updateCharacters] = reactReducer<Characters>(charactersDefault)

  const numActiveGoodCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "good" && character.isActive
  ).length

  const numActiveEvilCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "evil" && character.isActive
  ).length

  const maxGoodCharacters = maxCharacters[session.numPlayers]?.good
  const maxEvilCharacters = maxCharacters[session.numPlayers]?.evil

  const canContinue = () => {
    if (numActiveGoodCharacters > maxGoodCharacters) {
      return "You have selected too many Good characters!"
    }

    if (numActiveEvilCharacters > maxEvilCharacters) {
      return `You have selected too many evil characters`
    }

    return true
  }

  const handleContinue = async () => {
    if (!user.id) return

    try {
      const shuffledCharacters = shuffleArray(
        Object.values(characters)
          .filter((character) => character.isActive)
          .map((character) => character.id)
      )

      const playerUpdates: Record<string, Partial<Player>> = {}

      playersArray.forEach((player, i) => {
        playerUpdates[player.id] = {
          characterId: shuffledCharacters[i],
        }
      })

      goToStep({
        step: "characterReveal",
        playerUpdates,
      })
    } catch (error) {
      showToast(String(error), "error")
    }
  }

  return (
    <>
      {isMyPlayerHost && (
        <>
          <SetupCharacters
            heading="Good Characters"
            allegiance="good"
            characters={characters}
            maxActiveCharacters={maxGoodCharacters}
            updateCharacters={updateCharacters}
            numActiveCharacters={numActiveGoodCharacters}
            className={styles.section}
          />

          <SetupCharacters
            heading="Evil Characters"
            allegiance="evil"
            characters={characters}
            maxActiveCharacters={maxEvilCharacters}
            updateCharacters={updateCharacters}
            numActiveCharacters={numActiveEvilCharacters}
            className={styles.section}
          />
        </>
      )}

      {!isMyPlayerHost && <StepDescription heading="Please Wait" description="The Host is selecting Characters." />}

      <MenuBar showContinue={isMyPlayerHost} canContinue={canContinue} onContinue={handleContinue} />
    </>
  )
}
