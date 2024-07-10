import * as React from "react";

import { classes } from "utils";
import { useSessionStore } from "stores";
import { goToStep, updateActiveQuest, updateSession } from "services";
import { Players, ReadyButton } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestMemberResult = (props: Props) => {
  const { className } = props;

  const {
    activeQuest,
    isMyPlayerHost,
    isAllReady,
    playersArray,
    session,
    updateSessionStore,
  } = useSessionStore();

  const votes = Object.values(activeQuest.votesToApprove).sort(
    (a, b) => Number(b) - Number(a)
  );

  const hasPassed = Boolean(
    votes.filter((vote) => vote).length > votes.length / 2
  );

  const renderVotes = () => {
    const items: React.ReactNode[] = [];

    votes.forEach((vote) => {
      items.push(
        <div className={vote ? styles.yesVote : styles.noVote}>
          {vote ? "Success" : "Fail"}
        </div>
      );
    });

    return items;
  };

  React.useEffect(() => {
    updateSessionStore({
      heading: {
        title: "Vote Result",
        subtitle: "",
      },
    });
  }, []);

  React.useEffect(() => {
    if (!isMyPlayerHost || !isAllReady) return;

    if (hasPassed) {
      goToStep("questVote");
    } else {
      const currentLeaderIndex = playersArray.findIndex(
        (item) => item.id === activeQuest.leaderId
      );
      const newLeader =
        playersArray?.[currentLeaderIndex + 1] || playersArray[0];

      updateActiveQuest({
        leaderId: newLeader.id,
        players: [],
      });

      updateSession({
        step: "questMemberSelect",
        numFailVotes: Number(session.numFailVotes) + 1,
      });
    }
  }, [isAllReady, hasPassed]);

  return (
    <>
      <div className={classes(styles.container, className)}>
        <div className={styles.votes}>{renderVotes()}</div>

        {hasPassed && (
          <div className={styles.voteResult}>The Vote has passed</div>
        )}

        {!hasPassed && (
          <div className={styles.voteResult}>The Vote has failed</div>
        )}
      </div>
      <ReadyButton />

      <Players />
    </>
  );
};
