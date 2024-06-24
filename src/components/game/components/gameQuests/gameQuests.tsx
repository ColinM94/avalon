import { LoadingOverlay } from "components/loadingOverlay/loadingOverlay";

import { QuestsStatus } from "./components/questsStatus/questsStatus";
import { QuestsVote } from "./components/questsVote/questsVote";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuests = ({ state }: Props) => {
  const activeQuest = state.session.quests[state.session.activeQuest];

  if (!activeQuest) return <LoadingOverlay />;

  return (
    <div className={styles.container}>
      <QuestsVote state={state} activeQuest={activeQuest} />
      <QuestsStatus state={state} className={styles.questsStatus} />
    </div>
  );
};
