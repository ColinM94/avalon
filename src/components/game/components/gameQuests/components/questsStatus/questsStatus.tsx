import { classes } from "utils/classes";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { numPlayersByQuest } from "consts/general";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsStatus = ({ className }: Props) => {
  const { session, numPlayers, activeQuest } = useSessionStore();

  const renderQuests = () => {
    const items = [];

    for (let i = 0; i < 5; i++) {
      const quest = session.quests[i];

      items.push(
        <div
          key={i}
          className={classes(
            styles.quest,
            quest.status === "fail" && styles.questFailed,
            quest.status === "success" && styles.questSucceeded,
            quest.index === activeQuest.index && styles.questActive,
          )}
        >
          <div className={styles.questHeading}>Quest {i + 1}</div>
          <div className={styles.questLabel}>
            <div className={styles.questLabelValue}>{numPlayersByQuest[i][numPlayers - 5]}</div>
            <div className={styles.questLabelSubValue}>Players</div>
          </div>

          <div className={styles.questVotes}>
            {Object.values(quest.votesToSucceed).map((vote) => (
              <div className={vote ? styles.questVoteSuccess : styles.questVoteFailed} />
            ))}
          </div>
        </div>,
      );
    }

    return items;
  };

  return <div className={classes(styles.container, className)}>{renderQuests()}</div>;
};
