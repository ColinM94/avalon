import { Divider } from "components/divider/divider";
import { MenuBar } from "components/menuBar/menuBar";
import { Players } from "components/players/players";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { classes } from "utils/classes";
import { voteToApproveMember } from "services/session/voteToApproveMember";
import {
  memberSelectVoteCanContinue,
  memberSelectVoteCanReady,
  memberSelectVoteContinue,
} from "services/session/logic";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameMemberSelectVote = (props: Props) => {
  const { className } = props;

  const { isMyPlayerHost, myPlayer, activeQuest, players, activeMemberSelectVotes } = useSessionStore();

  const handleVoteClick = async (voteValue: boolean) => {
    await voteToApproveMember({
      playerId: myPlayer.id,
      voteValue,
    });
  };

  return (
    <>
      <Divider
        description={`${
          players[activeQuest.leaderId].name
        } has chosen these players to go on the quest. Do you approve?`}
      />

      <div className={classes(styles.container, className)}>
        <Players width={2} showOnlyPlayersOnActiveQuest className={styles.players} />

        <div className={styles.votes}>
          <div
            onClick={() => handleVoteClick(true)}
            className={classes(styles.yesVote, activeMemberSelectVotes?.[myPlayer.id] !== true && styles.voteDisabled)}
          >
            Yes
          </div>

          <div
            onClick={() => handleVoteClick(false)}
            className={classes(styles.noVote, activeMemberSelectVotes?.[myPlayer.id] !== false && styles.voteDisabled)}
          >
            No
          </div>
        </div>
      </div>

      <MenuBar
        canReady={() => memberSelectVoteCanReady(myPlayer.id)}
        canContinue={memberSelectVoteCanContinue}
        onContinue={memberSelectVoteContinue}
      />
    </>
  );
};
