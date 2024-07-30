import * as React from "react";
import { classes } from "utils";
import { useSessionStore } from "stores";
import { goToStep, updateSession } from "services";
import { Divider } from "components/divider/divider";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestVote = (props: Props) => {
  const { className } = props;

  const {
    players,
    myPlayer,
    isMyPlayerHost,
    activeQuest,
    session,
    updateSessionStore,
  } = useSessionStore();

  const isUpdating = React.useRef(false);

  const vote = Boolean(activeQuest?.votesToSucceed?.[myPlayer.id]);

  const handleVoteClick = (voteValue: boolean) => {
    if (myPlayer.isReady) return;

    updateSession({
      [`quests.${activeQuest.index}.votesToSucceed.${myPlayer.id}`]: voteValue,
    });
  };

  const validate = () => {
    if (!activeQuest.players.includes(myPlayer.id))
      return "You are not part of this quest.";

    return true;
  };

  React.useEffect(() => {
    if (!isMyPlayerHost || isUpdating.current) return;

    isUpdating.current = true;

    let shouldProceed = true;

    activeQuest.players.map((playerId) => {
      if (activeQuest.votesToSucceed?.[playerId] === undefined) {
        shouldProceed = false;
      }

      if (!players[playerId].isReady) {
        shouldProceed = false;
      }
    });

    if (!shouldProceed) {
      isUpdating.current = false;
      return;
    }

    updateSession({
      numFailQuests: Number(session.numFailQuests) + 1,
    });

    goToStep({
      step: "questResult",
    });
  }, [activeQuest.votesToSucceed]);

  React.useEffect(() => {
    updateSessionStore({ validateReady: validate });
  }, []);

  return (
    <div className={classes(styles.container, className)}>
      {!activeQuest.players.includes(myPlayer.id) && (
        <Divider description="The Quest is in progress" />
      )}

      {activeQuest.players.includes(myPlayer.id) && (
        <>
          <Divider description="You are on a quest. Evil players might want to fail the quest." />

          <div className={styles.votes}>
            <div
              onClick={() => handleVoteClick(true)}
              className={classes(
                styles.yesVote,
                vote !== true && styles.voteDisabled
              )}
            >
              Pass
            </div>

            <div
              onClick={() => handleVoteClick(false)}
              className={classes(
                styles.noVote,
                vote !== false && styles.voteDisabled
              )}
            >
              Fail
            </div>
          </div>
        </>
      )}
    </div>
  );
};
