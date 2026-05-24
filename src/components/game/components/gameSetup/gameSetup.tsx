import * as React from "react"

import { MenuBar } from "components/menuBar/menuBar"
import { StepDescription } from "components/stepDescription/stepDescription"
import { charactersDefault, maxCharacters } from "consts/characters"
import { goToStep } from "services/session/goToStep"
import { useAppStore } from "stores/useAppStore/useAppStore"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { useToastStore } from "stores/useToastStore/useToastStore"
import { Characters } from "types/characters"
import { Player } from "types/gameSession"
import { shuffleArray } from "utils/shuffleArray"
import { mergeReducer } from "utils/mergeReducer"

import { SetupCharacters } from "./components/setupCharacters/setupCharacters"

import styles from "./styles.module.scss"

export const GameSetup = () => {
  const { showToast } = useToastStore()
  const { user } = useAppStore()
  const { session, isMyPlayerHost, playersArray } = useSessionStore()

  const [characters, updateCharacters] = React.useReducer(mergeReducer<Characters>, charactersDefault)

  const numActiveGoodCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "good" && character.isActive,
  ).length

  const numActiveEvilCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "evil" && character.isActive,
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

    if (numActiveGoodCharacters < maxGoodCharacters) {
      return `You must select ${maxGoodCharacters} good characters`
    }

    if (numActiveEvilCharacters < maxEvilCharacters) {
      return `You must select ${maxEvilCharacters} evil characters`
    }

    return true
  }

  const handleContinue = () => {
    if (!user.id) return

    try {
      const shuffledCharacters = shuffleArray(
        Object.values(characters)
          .filter((character) => character.isActive)
          .map((character) => character.id),
      )

      const playerUpdates: Record<string, Partial<Player>> = {}

      playersArray.forEach((player, i) => {
        playerUpdates[player.id] = {
          characterId: shuffledCharacters[i],
        }
      })

      void goToStep({
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
