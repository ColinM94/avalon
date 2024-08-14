import { classes } from "utils"

import { MenuBarMenuButton } from "./components/menuBarMenuButton/menuBarMenuButton"
import { MenuBarReadyButton } from "./components/menuBarReadyButton/menuBarReadyButton"

import styles from "./styles.module.scss"
import { Props } from "./types"

export const MenuBar = (props: Props) => {
  const { canContinue, canReady, onContinue, onReady, showContinue, className } = props

  return (
    <div className={classes(styles.container, className)}>
      <MenuBarMenuButton />

      <MenuBarReadyButton
        showContinue={showContinue}
        canContinue={canContinue}
        canReady={canReady}
        onContinue={onContinue}
        onReady={onReady}
      />

      <div className={styles.rightSpace} />
    </div>
  )
}
