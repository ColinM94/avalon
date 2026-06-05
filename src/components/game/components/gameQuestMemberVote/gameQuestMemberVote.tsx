import { Divider } from "components/divider/divider"
import { MenuBar } from "components/menuBar/menuBar"
import { Players } from "components/players/players"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { classes } from "utils/classes"
import { questMemberVote } from "services/session/questMemberVote"
import { questMemberVoteCanContinue, questMemberVoteContinue } from "services/session/validation"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const GameQuestMemberVote = (props: Props) => {
  const { className } = props

  const { isMyPlayerHost, myPlayer, activeQuest, players } = useSessionStore()

  const handleVoteClick = async (voteValue: boolean) => {
    await questMemberVote({
      playerId: myPlayer.id,
      voteValue,
    })
  }

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
            className={classes(styles.yesVote, activeQuest.votesToApprove[myPlayer.id] !== true && styles.voteDisabled)}
          >
            Yes
          </div>

          <div
            onClick={() => handleVoteClick(false)}
            className={classes(styles.noVote, activeQuest.votesToApprove[myPlayer.id] !== false && styles.voteDisabled)}
          >
            No
          </div>
        </div>
      </div>

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={questMemberVoteCanContinue}
        onContinue={questMemberVoteContinue}
      />
    </>
  )
}
