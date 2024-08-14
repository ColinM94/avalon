import { MenuBar, StepDescription } from "components"
import { Characters } from "types"
import { getQuestNumPlayers, reactReducer, shuffleArray } from "utils"
import { charactersDefault, maxCharacters } from "consts"
import { useAppStore, useSessionStore, useToastStore } from "stores"
import { goToStep, updateDocument } from "services"

import { SetupCharacters } from "./components/setupCharacters/setupCharacters"

export const GameSetup = () => {
  const { showToast } = useToastStore()
  const { user } = useAppStore()
  const { session, isMyPlayerHost } = useSessionStore()

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
    if (numActiveGoodCharacters !== maxGoodCharacters) {
      const numRemaining = maxGoodCharacters - numActiveGoodCharacters

      if (Math.sign(numRemaining) === 1) {
        return `Please select ${numRemaining} more Good character${numRemaining === 1 ? "" : "s"}!`
      } else {
        return `You have selected too many Good character${numRemaining === 1 ? "" : "s"}!`
      }
    }

    if (numActiveEvilCharacters !== maxEvilCharacters) {
      const numRemaining = maxEvilCharacters - numActiveEvilCharacters

      if (Math.sign(numRemaining) === 1) {
        return `Please select ${numRemaining} more Evil character${numRemaining === 1 ? "" : "s"}!`
      } else {
        return `You have selected too many Evil character${numRemaining === 1 ? "" : "s"}!`
      }
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

      for (let i = 0; i < 5; i++) {
        session.quests[i] = {
          ...session.quests[i],
          numPlayers: getQuestNumPlayers(i, session.numPlayers),
        }
      }

      await updateDocument({
        id: session.id,
        collection: "sessions",
        data: {
          characters: shuffledCharacters,
        },
      })

      goToStep({
        step: "characterReveal",
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
          />

          <SetupCharacters
            heading="Evil Characters"
            allegiance="evil"
            characters={characters}
            maxActiveCharacters={maxEvilCharacters}
            updateCharacters={updateCharacters}
            numActiveCharacters={numActiveEvilCharacters}
          />
        </>
      )}

      {!isMyPlayerHost && <StepDescription heading="Please Wait" description="The Host is selecting Characters." />}

      <MenuBar showContinue={isMyPlayerHost} canContinue={canContinue} onContinue={handleContinue} />
    </>
  )
}
