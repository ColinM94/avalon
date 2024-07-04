import * as React from "react";

import { classes, sentencifyArray } from "utils";
import { useSessionStore } from "stores";
import { updateActiveQuest } from "services";
import { ReadyButton } from "components";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestMemberApproval = (props: Props) => {
  const { className } = props;

  const {
    isMyPlayerLeader,
    activeQuest,
    players,
    myPlayer,
    updateSessionStore,
  } = useSessionStore();

  const [vote, setVote] = React.useState<boolean | null>(null);

  const playersNames = activeQuest.players.map(
    (playerId) => players[playerId].name
  );

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
        title: "Vot to approve",
        subtitle: `${sentencifyArray(
          playersNames
        )} will go on the quest, do you approve?`,
      },
    });
  }, []);

  // const votes = () => {
  //   const items = [];

  //   for (let i = 0; i < playersArray.length; i++) {
  //     items.push(<div className={styles.vote}>Vote Result</div>);
  //   }

  //   return items;
  // };

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
      <div className={styles.votes}>
        <div
          onClick={() => handleVoteClick(false)}
          className={classes(
            styles.noVote,
            vote !== false && styles.voteDisabled
          )}
        >
          No
        </div>

        <div
          onClick={() => handleVoteClick(true)}
          className={classes(
            styles.yesVote,
            vote !== true && styles.voteDisabled
          )}
        >
          Yes
        </div>
      </div>

      <ReadyButton disabled={vote === null} onClick={handleLockIn} />
      {/* <div className={styles.votes}>{votes()}</div> */}
    </div>
  );
};
