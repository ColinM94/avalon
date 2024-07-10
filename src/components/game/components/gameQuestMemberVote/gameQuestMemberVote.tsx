import * as React from "react";

import { classes } from "utils";
import { useSessionStore } from "stores";
import { goToStep, updateDocument, updateMyPlayer } from "services";
import { Players, ReadyButton } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestMemberVote = (props: Props) => {
  const { className } = props;

  const {
    isMyPlayerLeader,
    isMyPlayerHost,
    myPlayer,
    isAllReady,
    activeQuest,
    session,
    updateSessionStore,
  } = useSessionStore();

  const [vote, setVote] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    if (isMyPlayerLeader) {
      updateSessionStore({
        heading: {
          title: "Vote to Approve",
          subtitle: "The other players are voting to approve your selection",
        },
      });
    }

    updateSessionStore({
      heading: {
        title: "Vote to approve",
        subtitle: `These players will go on the quest, do you approve?`,
      },
    });
  }, []);

  const handleVoteClick = (voteValue: boolean) => {
    if (myPlayer.isReady) return;

    setVote(voteValue);
  };

  const handleLockIn = () => {
    updateDocument({
      collection: "sessions",
      id: session.id,
      data: {
        [`quests.${activeQuest.index}.votesToApprove.${myPlayer.id}`]: vote,
      },
    });

    updateMyPlayer({
      isReady: true,
    });
  };

  React.useEffect(() => {
    if (isMyPlayerHost && isAllReady) {
      goToStep("questMemberResult");
    }
  }, [isAllReady]);

  return (
    <>
      <div className={classes(styles.container, className)}>
        <Players width={3} showOnlyPlayersOnActiveQuest />

        <div className={styles.votes}>
          <div
            onClick={() => handleVoteClick(true)}
            className={classes(
              styles.yesVote,
              vote !== true && styles.voteDisabled
            )}
          >
            Yes
          </div>

          <div
            onClick={() => handleVoteClick(false)}
            className={classes(
              styles.noVote,
              vote !== false && styles.voteDisabled
            )}
          >
            No
          </div>
        </div>

        <ReadyButton disabled={vote === null} onClick={handleLockIn} />
        {/* <div className={styles.votes}>{votes()}</div> */}
      </div>
      <Players showIsReady />
    </>
  );
};
