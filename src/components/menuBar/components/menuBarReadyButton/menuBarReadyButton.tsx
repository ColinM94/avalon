import * as React from "react"

import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { updateMyPlayer } from "services/session/updateMyPlayer"
import { Button } from "components/button/button"
import { classes } from "utils/classes"
import { LoadingOverlay } from "components/loadingOverlay/loadingOverlay"
import { useAppStore } from "stores/useAppStore/useAppStore"

import styles from "./styles.module.scss"
import { Props } from "./types"

export const MenuBarReadyButton = (props: Props) => {
  const { canReady, onReady, showContinue, canContinue, onContinue } = props

  const { myPlayer } = useSessionStore()
  const { showToast } = useAppStore()

  const [isLoading, setIsLoading] = React.useState(false)

  const isContinueDisabled = Boolean((canContinue && canContinue() !== true) || isLoading)
  const isReadyDisabled = Boolean((canReady && canReady() !== true) || isLoading)

  // React.useEffect(() => {
  //   void (() => {
  //     if (myPlayer.isMyPlayerHost) return

  //     setTimeout(() => {
  //       void handleReady()
  //     }, 1000)
  //   })()
  // }, [])

  const handleCanReady = (alertUser: boolean) => {
    if (!canReady) return

    const result = canReady?.()

    if (result === true) return result

    if (alertUser) showToast(result, "error")
  }

  const handleReady = async () => {
    try {
      setIsLoading(true)

      const result = canReady?.()

      if (result !== true && typeof result === "string") throw new Error(result)

      await onReady?.()

      await updateMyPlayer({
        isReady: true,
      })
    } catch (error) {
      const err = error as Error
      showToast(err.message, "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleContinue = async () => {
    try {
      setIsLoading(true)

      if (canContinue) {
        const result = canContinue()

        if (result !== true) throw new Error(result)
      }

      await onContinue?.()
    } catch (error) {
      const err = error as Error
      showToast(err.message, "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <LoadingOverlay />}

      {showContinue && (
        <Button
          label="Continue"
          onClick={handleContinue}
          onClickDisabled={handleContinue}
          disabled={isContinueDisabled}
          className={classes(styles.container, isContinueDisabled && styles.disabled)}
        />
      )}

      {!showContinue && onReady && (
        <Button
          label={"Ready"}
          onClick={handleReady}
          onClickDisabled={() => handleCanReady(true)}
          disabled={isReadyDisabled}
          className={classes(styles.container, (myPlayer.isReady || !canReady) && styles.disabled)}
        />
      )}
    </>
  )
}
