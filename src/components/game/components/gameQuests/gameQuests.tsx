import { LoadingOverlay } from "components/loadingOverlay/loadingOverlay"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"

import { QuestsStatus } from "./components/questsStatus/questsStatus"
import styles from "./styles.module.scss"

export const GameQuests = () => {
  const { activeQuest } = useSessionStore()

  if (!activeQuest) return <LoadingOverlay />

  return (
    <div className={styles.container}>
      {/* <QuestsMemberSelect activeQuest={activeQuest} /> */}
      <QuestsStatus className={styles.questsStatus} />
    </div>
  )
}
