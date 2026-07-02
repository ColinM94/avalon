import * as React from "react";

import { classes } from "utils/classes";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Modal } from "components/modal/modal";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsStatus = ({ className }: Props) => {
  const { quests, activeQuest, numPlayers } = useSessionStore();

  const [selectedQuest, setSelectedQuest] = React.useState<number | null>(null);

  const renderVotes = (questIndex: number, voteIndex: number) => {
    const quest = quests[questIndex];

    const items = [];

    for (let i = 0; i < numPlayers; i++) {
      const vote = quest.memberSelectVotes[voteIndex]?.[i];

      items.push(
        <div
          className={classes(styles.vote, vote === true && styles.voteSuccess, vote === false && styles.voteFailed)}
        />,
      );
    }

    return items;
  };

  const renderQuestVotes = (questIndex: number) => {
    const quest = quests[questIndex];

    const votes = Object.values(quest.votesToSucceed);

    return (
      <div className={styles.questVotes}>
        {votes.map((vote) => (
          <div
            className={classes(
              styles.questVote,
              vote === true && styles.voteSuccess,
              vote === false && styles.voteFailed,
            )}
          />
        ))}
      </div>
    );
  };

  const renderQuests = () => {
    const items = [];

    for (let i = 0; i < 5; i++) {
      const quest = quests[i];

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

          {renderQuestVotes(i)}
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
            Quest {selectedQuest + 1} Votes
            <div className={styles.votesRow}>
              <div className={styles.votesRowLabel}>1.</div> {renderVotes(selectedQuest, 0)}
            </div>
            <div className={styles.votesRow}>
              <div className={styles.votesRowLabel}>2.</div> {renderVotes(selectedQuest, 1)}
            </div>
            <div className={styles.votesRow}>
              <div className={styles.votesRowLabel}>3.</div> {renderVotes(selectedQuest, 2)}
            </div>
            <div className={styles.votesRow}>
              <div className={styles.votesRowLabel}>4.</div> {renderVotes(selectedQuest, 3)}
            </div>
            <div className={styles.votesRow}>
              <div className={styles.votesRowLabel}>5.</div> {renderVotes(selectedQuest, 4)}
            </div>
          </>
        )}
      </Modal>
    </>
  );
};
