import * as React from "react"

import { classes } from "utils"
import { useSessionStore } from "stores"
import { goToStep, updateMyPlayer } from "services"
import { Divider, MenuBar, Players } from "components"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const GameQuestMemberVote = (props: Props) => {
  const { className } = props

  const { isMyPlayerHost, myPlayer, isAllReady, activeQuest, players } = useSessionStore()

  const [vote, setVote] = React.useState<boolean | null>(null)

  const handleVoteClick = (voteValue: boolean) => {
    if (myPlayer.isReady) return

    setVote(voteValue)
  }

  const canContinue = () => {
    if (!isAllReady) return "All players are not ready"

    return true
  }

  const onContinue = () => {
    goToStep({
      step: "questMemberResult",
    })
  }

  const canReady = () => {
    if (vote === null) return "You must vote"

    return true
  }

  const onReady = () => {
    updateMyPlayer({
      isReady: true,
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
            className={classes(styles.yesVote, vote !== true && styles.voteDisabled)}
          >
            Yes
          </div>

          <div
            onClick={() => handleVoteClick(false)}
            className={classes(styles.noVote, vote !== false && styles.voteDisabled)}
          >
            No
          </div>
        </div>
      </div>

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={canContinue}
        onContinue={onContinue}
        canReady={canReady}
        onReady={onReady}
      />
    </>
  )
}
