import * as React from "react"

import { Button } from "components/button/button"
import { CharacterCard } from "components/characterCard/characterCard"
import { MenuBar } from "components/menuBar/menuBar"
import { charactersDefault } from "consts/characters"
import { goToStep } from "services/session/goToStep"
import { updateMyPlayer } from "services/session/updateMyPlayer"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { classes } from "utils/classes"

import styles from "./styles.module.scss"

export const GameReveal = () => {
  const { myPlayer, isMyPlayerHost, isAllReady, session } = useSessionStore()

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
    void goToStep({
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
