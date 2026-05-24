import { Divider } from "components/divider/divider"
import { MenuBar } from "components/menuBar/menuBar"
import { Players } from "components/players/players"
import { goToStep } from "services/session/goToStep"
import { updateMyPlayer } from "services/session/updateMyPlayer"
import { updateSession } from "services/session/updateSession"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { classes } from "utils/classes"
import { questMemberVote } from "services/session/questMemberVote"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const GameQuestMemberVote = (props: Props) => {
  const { className } = props

  const { isMyPlayerHost, myPlayer, isAllReady, activeQuest, players, session } = useSessionStore()

  const handleVoteClick = async (voteValue: boolean) => {
    await questMemberVote({
      playerId: myPlayer.id,
      voteValue,
    })

    void updateMyPlayer({
      isReady: true,
    })
  }

  const canContinue = () => {
    if (!isAllReady) return "All players are not ready"

    return true
  }

  const onContinue = () => {
    const votes = Object.values(activeQuest.votesToApprove).sort((a, b) => Number(b) - Number(a))
    const hasPassed = Boolean(votes.filter((vote) => vote).length > votes.length / 2)

    if (!hasPassed) {
      void updateSession({
        numFailVotes: session.numFailVotes + 1,
      })
    }

    void goToStep({
      step: "questMemberResult",
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

      <MenuBar showContinue={isMyPlayerHost} canContinue={canContinue} onContinue={onContinue} />
    </>
  )
}
