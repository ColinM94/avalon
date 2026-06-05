import { Divider } from "components/divider/divider"
import { MenuBar } from "components/menuBar/menuBar"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { classes } from "utils/classes"
import { questSucceedVote } from "services/session/questSucceedVote"

import { Props } from "./types"
import styles from "./styles.module.scss"
import { questVoteCanContinue, questVoteCanReady, questVoteContinue, questVoteReady } from "services/session/validation"

export const GameQuestVote = (props: Props) => {
  const { className } = props

  const { myPlayer, isMyPlayerHost, activeQuest } = useSessionStore()

  const vote = Boolean(activeQuest?.votesToSucceed?.[myPlayer.id])

  const handleVoteClick = (voteValue: boolean) => {
    // if (myPlayer.isReady && !isMyPlayerHost) return

    void questSucceedVote({
      playerId: myPlayer.id,
      voteValue,
    })
  }

  return (
    <div className={classes(styles.container, className)}>
      {!activeQuest.players.includes(myPlayer.id) && <Divider description="The Quest is in progress" />}

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
    </div>
  )
}
