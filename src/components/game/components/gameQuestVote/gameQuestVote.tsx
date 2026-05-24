import * as React from "react"

import { Divider } from "components/divider/divider"
import { MenuBar } from "components/menuBar/menuBar"
import { goToStep } from "services/session/goToStep"
import { updateMyPlayer } from "services/session/updateMyPlayer"
import { updateSession } from "services/session/updateSession"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { classes } from "utils/classes"
import { questSucceedVote } from "services/session/questSucceedVote"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const GameQuestVote = (props: Props) => {
  const { className } = props

  const { players, myPlayer, isMyPlayerHost, activeQuest, session } = useSessionStore()

  const isUpdating = React.useRef(false)

  const vote = Boolean(activeQuest?.votesToSucceed?.[myPlayer.id])

  const handleVoteClick = (voteValue: boolean) => {
    if (myPlayer.isReady) return

    void questSucceedVote({
      playerId: myPlayer.id,
      voteValue,
    })
  }

  const canContinue = () => {
    const playersOnQuestAreReady = activeQuest.players.every((playerId) => players[playerId].isReady)

    if (!playersOnQuestAreReady) return "Not all players on quest are ready"

    return true
  }

  const onContinue = () => {
    if (!isMyPlayerHost || isUpdating.current) return

    isUpdating.current = true

    let shouldProceed = true

    console.log(activeQuest)

    activeQuest.players.map((playerId) => {
      if (activeQuest.votesToSucceed?.[playerId] === undefined) {
        shouldProceed = false

        console.log("hello")
      }

      if (!players[playerId].isReady) {
        shouldProceed = false
      }
    })

    if (!shouldProceed) {
      isUpdating.current = false
      return
    }

    void updateSession({
      numFailQuests: Number(session.numFailQuests) + 1,
    })

    void goToStep({
      step: "questResult",
    })
  }

  const canReady = () => {
    if (!activeQuest.players.includes(myPlayer.id)) return "You are not part of this quest."

    return true
  }

  const onReady = () => {
    void updateMyPlayer({
      isReady: true,
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
        canContinue={canContinue}
        onContinue={onContinue}
        canReady={canReady}
        onReady={onReady}
      />
    </div>
  )
}
