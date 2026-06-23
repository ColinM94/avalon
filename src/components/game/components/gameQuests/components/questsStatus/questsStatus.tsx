import * as React from "react";

import { classes } from "utils/classes";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Modal } from "components/modal/modal";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsStatus = ({ className }: Props) => {
  const { quests, activeQuest } = useSessionStore();

  const [selectedQuest, setSelectedQuest] = React.useState<number | null>(null);

  const renderVotes = (questIndex: number) => {
    const quest = quests[questIndex];

    return (
      <>
        {Object.values(quest.memberSelectVotes).map((votes, index) => (
          <div className={styles.questVotes}>
            Round {index + 1}
            {Object.values(votes).map((vote) => (
              <div className={classes(styles.questVote, vote ? styles.questVoteSuccess : styles.questVoteFailed)} />
            ))}
            <div className={styles.vote} />
          </div>
        ))}
      </>
    );
  };

  const renderQuestVotes = (questIndex: number) => {
    const quest = quests[questIndex];

    console.log(quest);

    const votes = Object.values(quest.votesToSucceed);

    return (
      <div className={styles.questVotes}>
        {votes.map((vote) => (
          <div
            className={classes(
              styles.questVote,
              vote === true && styles.questVoteSuccess,
              vote === false && styles.questVoteFailed,
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
            {renderVotes(selectedQuest)}
          </>
        )}
      </Modal>
    </>
  );
};
