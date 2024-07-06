import * as React from "react";

import { classes } from "utils";
import { useSessionStore } from "stores";
import { updateActiveQuest } from "services";
import { PlayerCard, ReadyButton } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestMemberVote = (props: Props) => {
  const { className } = props;

  const {
    isMyPlayerLeader,
    activeQuest,
    players,
    myPlayer,

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
    setVote(voteValue);
  };

  const handleLockIn = () => {
    updateActiveQuest({
      [`votesToApprove.${myPlayer.id}`]: vote,
    });
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.players}>
        {activeQuest.players.map((playerId) => (
          <PlayerCard player={players[playerId]} className={styles.player} />
        ))}
      </div>

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
  );
};
