import * as React from "react";

import { classes } from "utils";
import { useSessionStore } from "stores";
import { goToStep, updateActiveQuest, updateSession } from "services";
import { Divider } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestMemberResult = (props: Props) => {
  const { className } = props;

  const {
    activeQuest,
    isMyPlayerHost,
    myPlayer,
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
    if (!isMyPlayerHost || !myPlayer.isReady) return;

    if (hasPassed) {
      goToStep({
        step: "questVote",
      });
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
        numFailVotes: Number(session.numFailVotes) + 1,
      });

      goToStep({
        step: "questMemberSelect",
      });
    }
  }, [myPlayer.isReady]);

  const validate = () => {
    if (!isMyPlayerHost) return "Waiting for the host!";

    return true;
  };

  React.useEffect(() => {
    updateSessionStore({ validateReady: validate });
  }, [isMyPlayerHost, hasPassed]);

  return (
    <>
      <Divider
        label={hasPassed ? "The Vote has passed" : "The Vote has failed"}
      />

      <div className={classes(styles.container, className)}>
        {renderVotes()}
      </div>
    </>
  );
};
