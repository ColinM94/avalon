import * as React from "react";

import { useSessionStore } from "stores";
import { LoadingOverlay } from "components";
import { updateActiveQuest } from "services";

import { QuestsStatus } from "./components/questsStatus/questsStatus";

import styles from "./styles.module.scss";

export const GameQuests = () => {
  const { activeQuest, session, players } = useSessionStore();

  if (!activeQuest) return <LoadingOverlay />;

  return (
    <div className={styles.container}>
      {/* <QuestsMemberSelect activeQuest={activeQuest} /> */}
      <QuestsStatus className={styles.questsStatus} />
    </div>
  );
};
