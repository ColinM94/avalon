import { LoadingOverlay } from "components/loadingOverlay/loadingOverlay"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { classes } from "utils/classes"

import { QuestsStatus } from "./components/questsStatus/questsStatus"
import styles from "./styles.module.scss"

interface Props {
  className?: string
}

export const GameQuests = (props: Props) => {
  const { className } = props
  const { activeQuest } = useSessionStore()

  if (!activeQuest) return <LoadingOverlay />

  return (
    <div className={classes(styles.container, className)}>
      <QuestsStatus className={styles.questsStatus} />
    </div>
  )
}
