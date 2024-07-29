import * as React from "react";

import { classes } from "utils";
import { useSessionStore } from "stores";
import { goToStep, updateSession } from "services";
import { Divider, Players } from "components";

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
    players,
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

  React.useEffect(() => {
    if (isMyPlayerHost && isAllReady) {
      goToStep({
        step: "questMemberResult",
      });
    }
  }, [isAllReady]);

  const validate = () => {
    if (vote === null) return "You must vote";

    updateSession({
      [`quests.${activeQuest.index}.votesToApprove.${myPlayer.id}`]: vote,
    });

    return true;
  };

  React.useEffect(() => {
    updateSessionStore({ validateReady: validate });
  }, [vote]);

  return (
    <>
      <Divider
        label="Vote"
        description={`${
          players[activeQuest.leaderId].name
        } has chosen these players to go on the quest. Do you approve?`}
      />

      <div className={classes(styles.container, className)}>
        <Players
          width={2}
          showOnlyPlayersOnActiveQuest
          className={styles.players}
        />

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
      </div>
    </>
  );
};
