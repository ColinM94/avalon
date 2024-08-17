import { classes } from "utils"
import { useSessionStore } from "stores"
import { goToStep, updateDocument, updateMyPlayer, updateSession } from "services"
import { Divider, MenuBar, Players } from "components"
import { GameSession } from "types"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const GameQuestMemberVote = (props: Props) => {
  const { className } = props

  const { isMyPlayerHost, myPlayer, isAllReady, activeQuest, players, session } = useSessionStore()

  const handleVoteClick = async (voteValue: boolean) => {
    // console.log(voteValue)
    await updateDocument<GameSession>({
      id: session.id,
      collection: "sessions",
      data: {
        [`quests.${session.activeQuestIndex}.votesToApprove.${myPlayer.id}`]: voteValue,
      },
    })

    updateMyPlayer({
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
      updateSession({
        numFailVotes: (session.numFailVotes += 1),
      })
    }

    goToStep({
      step: "questMemberResult",
    })
  }

  console.log(activeQuest.votesToApprove[myPlayer.id])

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
