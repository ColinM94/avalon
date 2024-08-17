import { classes } from "utils"
import { Button } from "components"
import { useSessionStore, useToastStore } from "stores"
import { updateMyPlayer } from "services"

import styles from "./styles.module.scss"
import { Props } from "./types"

export const MenuBarReadyButton = (props: Props) => {
  const { canReady, onReady, showContinue, canContinue, onContinue } = props

  const { myPlayer } = useSessionStore()
  const { showToast } = useToastStore()

  const handleCanReady = (alertUser: boolean) => {
    if (!canReady) return

    const result = canReady?.()

    if (result === true) return result

    if (alertUser) showToast(result, "error")
  }

  const handleReady = () => {
    try {
      const result = canReady?.()

      if (result !== true) throw result

      onReady?.()

      updateMyPlayer({
        isReady: true,
      })
    } catch (error) {
      showToast(String(error), "error")
    }
  }

  const handleContinue = () => {
    try {
      if (canContinue) {
        const result = canContinue()

        if (result !== true) throw result
      }

      onContinue?.()
    } catch (error) {
      showToast(String(error), "error")
    }
  }

  const isContinueDisabled = () => {
    if (canContinue && canContinue() !== true) return true

    return false
  }

  if (showContinue) {
    return (
      <Button
        label="Continue"
        onClick={handleContinue}
        onClickDisabled={handleContinue}
        disabled={isContinueDisabled()}
        className={classes(styles.container, isContinueDisabled() && styles.disabled)}
      />
    )
  }

  if (onReady) {
    return (
      <Button
        label={"Ready"}
        onClick={handleReady}
        onClickDisabled={() => handleCanReady(true)}
        disabled={canReady ? canReady?.() !== true : false}
        className={classes(styles.container, (myPlayer.isReady || !canReady) && styles.disabled)}
      />
    )
  }
}
