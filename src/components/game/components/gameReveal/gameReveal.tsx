import * as React from "react"

import { Button, CharacterCard, MenuBar } from "components"
import { classes } from "utils"
import { useSessionStore } from "stores"
import { goToStep, updateActiveQuest, updateMyPlayer } from "services"
import { charactersDefault, numPlayersByQuest } from "consts"

import styles from "./styles.module.scss"

export const GameReveal = () => {
  const { myPlayer, isMyPlayerHost, isAllReady, session, players } = useSessionStore()

  const [showCharacter, setShowCharacter] = React.useState(false)
  const [isCharacterRevealed, setIsCharacterRevealed] = React.useState(false)

  const characterId = session.players?.[myPlayer.id]?.characterId

  const handleReveal = () => {
    setIsCharacterRevealed(true)
    setShowCharacter(!showCharacter)
  }

  const canContinue = () => {
    if (!isCharacterRevealed) "You must view your character first"
    if (!isAllReady) return "All players are not ready"

    return true
  }

  const handleContinue = () => {
    updateActiveQuest({
      numPlayers: numPlayersByQuest[session.activeQuestIndex][session.numPlayers - 5],
      leaderId: Object.values(players)[0].id,
    })

    goToStep({
      step: "questMemberSelect",
    })
  }

  const canReady = () => {
    if (!isCharacterRevealed) return "You must view your character first"

    return true
  }

  const onReady = () => {
    updateMyPlayer({
      isReady: true,
    })
  }

  return (
    <>
      <CharacterCard
        character={charactersDefault[characterId]}
        showDescription
        showName
        alwaysActive
        className={classes(styles.character, !showCharacter && styles.characterHidden)}
      />

      <Button
        label={showCharacter ? "Hide Character" : "Reveal Character"}
        onClick={handleReveal}
        className={styles.revealButton}
      />

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={canContinue}
        onContinue={handleContinue}
        canReady={canReady}
        onReady={onReady}
      />
    </>
  )
}
