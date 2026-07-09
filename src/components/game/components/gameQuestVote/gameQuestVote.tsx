import { Divider } from "components/divider/divider";
import { MenuBar } from "components/menuBar/menuBar";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { classes } from "utils/classes";
import { questSucceedVote } from "services/session/questSucceedVote";
import { questVoteCanContinue, questVoteCanReady, questVoteContinue, questVoteReady } from "services/session/logic";
import { PlayerCard } from "components/playerCard/playerCard";

import styles from "./styles.module.scss";

export const GameQuestVote = () => {
  const { myPlayer, isMyPlayerHost, activeQuest, players } = useSessionStore();

  const vote = Boolean(activeQuest?.votesToSucceed?.[myPlayer.id]);

  const handleVoteClick = (voteValue: boolean) => {
    // if (myPlayer.isReady && !isMyPlayerHost) return

    void questSucceedVote({
      playerId: myPlayer.id,
      voteValue,
    });
  };

  const playersToShow = activeQuest.players.filter((playerId) => playerId !== myPlayer.id);

  const myPlayerIsOnQuest = activeQuest.players.includes(myPlayer.id);

  return (
    <>
      {!myPlayerIsOnQuest && <Divider description="These players are currently on a quest" />}
      {myPlayerIsOnQuest && <Divider description="You are currently on a quest with these player(s)" />}

      {!activeQuest.players.includes(myPlayer.id) && (
        <div className={styles.players}>
          {playersToShow.map((player) => (
            <PlayerCard player={players[player]} showName showLeaderIcon />
          ))}
        </div>
      )}

      {activeQuest.players.includes(myPlayer.id) && (
        <>
          <Divider description="You are on a quest. Evil players might want to fail the quest." />

          <div className={styles.votes}>
            <div
              onClick={() => handleVoteClick(true)}
              className={classes(styles.yesVote, vote !== true && styles.voteDisabled)}
            >
              Pass
            </div>

            <div
              onClick={() => handleVoteClick(false)}
              className={classes(styles.noVote, vote !== false && styles.voteDisabled)}
            >
              Fail
            </div>
          </div>
        </>
      )}

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={questVoteCanContinue}
        onContinue={questVoteContinue}
        canReady={() => questVoteCanReady(myPlayer.id)}
        onReady={() => questVoteReady(myPlayer.id)}
      />
    </>
  );
};
