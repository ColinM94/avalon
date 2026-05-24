import * as React from "react"

import { Props } from "./types"
import styles from "./styles.module.scss"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { Divider } from "components/divider/divider"
import { MenuBar } from "components/menuBar/menuBar"
import { goToStep } from "services/session/goToStep"
import { updateActiveQuest } from "services/session/updateActiveQuest"
import { updateMyPlayer } from "services/session/updateMyPlayer"
import { updateSession } from "services/session/updateSession"
import { classes } from "utils/classes"

export const GameQuestResult = (props: Props) => {
  const { className } = props

  const { activeQuest, isMyPlayerHost, myPlayer, playersArray, session } = useSessionStore()

  const votes = Object.values(activeQuest.votesToSucceed).sort((a, b) => Number(b) - Number(a))

  const hasPassed = !votes.some((vote) => !vote)

  const renderVotes = () => {
    const items: React.ReactNode[] = []

    votes.forEach((vote, index) => {
      items.push(
        <div key={index} className={vote ? styles.yesVote : styles.noVote}>
          {vote ? "Success" : "Fail"}
        </div>,
      )
    })

    return items
  }

  const onContinue = () => {
    if (!isMyPlayerHost) return

    if (hasPassed) {
      void goToStep({
        step: "questVote",
      })
    } else {
      const currentLeaderIndex = playersArray.findIndex((item) => item.id === activeQuest.leaderId)
      const newLeader = playersArray?.[currentLeaderIndex + 1] || playersArray[0]

      void updateActiveQuest({
        leaderId: newLeader.id,
        players: [],
        votesToSucceed: {},
      })

      void updateSession({
        numFailVotes: Number(session.numFailVotes) + 1,
      })

      void goToStep({
        step: "questMemberSelect",
      })
    }
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
    <>
      <Divider description={hasPassed ? "The Quest has Succeeded" : "The Quest has Failed"} />

      <div className={classes(styles.container, className)}>{renderVotes()}</div>

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={() => true}
        onContinue={onContinue}
        canReady={canReady}
        onReady={onReady}
      />
    </>
  )
}
