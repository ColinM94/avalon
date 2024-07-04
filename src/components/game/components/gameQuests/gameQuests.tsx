import { useSessionStore } from "stores";
import { LoadingOverlay } from "components";

import { QuestsStatus } from "./components/questsStatus/questsStatus";

import styles from "./styles.module.scss";

export const GameQuests = () => {
  const { activeQuest } = useSessionStore();

  if (!activeQuest) return <LoadingOverlay />;

  return (
    <div className={styles.container}>
      {/* <QuestsMemberSelect activeQuest={activeQuest} /> */}
      <QuestsStatus className={styles.questsStatus} />
    </div>
  );
};
