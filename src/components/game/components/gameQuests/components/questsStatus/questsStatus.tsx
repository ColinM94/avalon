import * as React from "react";
import { classes } from "utils/classes";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Modal } from "components/modal/modal";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsStatus = ({ className }: Props) => {
  const { session, activeQuest } = useSessionStore();

  const [selectedQuest, setSelectedQuest] = React.useState<number | null>(null);

  const renderVotes = (questIndex: number) => {
    const quest = session.quests[questIndex];

    return (
      <div className={styles.questVotes}>
        {Array.from({ length: session.quests[questIndex].numPlayers }, (_, index) => (
          <div
            key={index}
            className={
              /**quest.votesToSucceed[index] ? styles.questVoteSuccess : styles.questVoteFailed**/ styles.questVote
            }
            key={questIndex}
          />
        ))}
        {/* {activeQuest.index !== questIndex &&
          Object.values(quest.votesToSucceed).map((vote) => (
            <div className={vote ? styles.questVoteSuccess : styles.questVoteFailed} key={questIndex} />
          ))} */}
      </div>
    );
  };

  const renderQuests = () => {
    const items = [];

    for (let i = 0; i < 5; i++) {
      const quest = session.quests[i];

      items.push(
        <div
          key={i}
          onClick={() => setSelectedQuest(i)}
          className={classes(
            styles.quest,
            quest.status === "fail" && styles.questFailed,
            quest.status === "success" && styles.questSucceeded,
            quest.index === activeQuest.index && styles.questActive,
          )}
        >
          <div className={styles.questHeading}>Quest {i + 1}</div>
          {/* <div className={styles.questLabel}>
            <div className={styles.questLabelValue}>{session.quests[i].numPlayers}</div>
            <div className={styles.questLabelSubValue}>Players</div>
          </div> */}

          {renderVotes(i)}
        </div>,
      );
    }

    return items;
  };

  return (
    <>
      <div className={classes(styles.container, className)}>{renderQuests()}</div>

      <Modal show={Boolean(selectedQuest !== null)} setShow={() => setSelectedQuest(null)} className={styles.modal}>
        {selectedQuest !== null && (
          <>
            Info about quest {selectedQuest + 1}
            {renderVotes(selectedQuest)}
          </>
        )}
      </Modal>
    </>
  );
};
