import * as React from "react";

import { useSessionStore } from "stores";
import { LoadingOverlay } from "components";
import { updateSession } from "services";

import { QuestsStatus } from "./components/questsStatus/questsStatus";
import { QuestsVote } from "./components/questsVote/questsVote";

import styles from "./styles.module.scss";

export const GameQuests = () => {
  const { activeQuest, session, players } = useSessionStore();

  React.useEffect(() => {
    if (!activeQuest?.leaderId) {
      updateSession({
        activeQuestIndex: 0,
        leaderId: Object.values(players)[0].id,
      });
    }
  }, [session.activeQuestIndex]);

  console.log(activeQuest);

  if (!activeQuest) return <LoadingOverlay />;

  return (
    <div className={styles.container}>
      <QuestsVote activeQuest={activeQuest} />
      <QuestsStatus className={styles.questsStatus} />
    </div>
  );
};
