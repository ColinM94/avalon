import * as React from "react"

import { Button } from "components/button/button"
import { CharacterCard } from "components/characterCard/characterCard"
import { MenuBar } from "components/menuBar/menuBar"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { classes } from "utils/classes"
import { charactersDefault } from "consts/defaults"
import { revealCanContinue, revealCanReady, revealContinue, revealReady } from "services/session/validation"

import styles from "./styles.module.scss"

export const GameReveal = () => {
  const { myPlayer, isMyPlayerHost, session } = useSessionStore()

  const [showCharacter, setShowCharacter] = React.useState(false)
  const [isCharacterRevealed, setIsCharacterRevealed] = React.useState(false)

  const characterId = session.players?.[myPlayer.id]?.characterId

  const handleReveal = () => {
    setIsCharacterRevealed(true)
    setShowCharacter(!showCharacter)
  }

  return (
    <>
      <CharacterCard
        character={charactersDefault[characterId]}
        showDescription
        showName
        alwaysActive
        orientation="landscape"
        className={classes(styles.character, !showCharacter && styles.characterHidden)}
      />

      <Button
        label={showCharacter ? "Hide Character" : "Reveal Character"}
        onClick={handleReveal}
        className={styles.revealButton}
      />

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={() => revealCanContinue(isCharacterRevealed)}
        onContinue={revealContinue}
        canReady={() => revealCanReady(isCharacterRevealed)}
        onReady={() => revealReady(myPlayer.id)}
      />
    </>
  )
}
