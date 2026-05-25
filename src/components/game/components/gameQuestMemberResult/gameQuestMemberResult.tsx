import * as React from "react"

import { MenuBar } from "components/menuBar/menuBar"
import { goToStep } from "services/session/goToStep"
import { updateActiveQuest } from "services/session/updateActiveQuest"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { classes } from "utils/classes"
import { Divider } from "components/divider/divider"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const GameQuestMemberResult = (props: Props) => {
  const { className } = props

  const { activeQuest, isMyPlayerHost, playersArray, session } = useSessionStore()

  const votes = Object.values(activeQuest.votesToApprove).sort((a, b) => Number(b) - Number(a))

  const hasPassed = Boolean(votes.filter((vote) => vote).length > votes.length / 2)

  const renderVotes = () => {
    const items: React.ReactNode[] = []

    votes.forEach((vote) => {
      items.push(<div className={vote ? styles.yesVote : styles.noVote}>{vote ? "Success" : "Fail"}</div>)
    })

    return items
  }

  const onContinue = () => {
    if (session.numFailVotes >= 5) {
      void goToStep({
        step: "gameOver",
      })

      return
    }

    if (hasPassed) {
      void goToStep({
        step: "questVote",
      })

      return
    }

    const currentLeaderIndex = playersArray.findIndex((item) => item.id === activeQuest.leaderId)
    const newLeader = playersArray?.[currentLeaderIndex + 1] || playersArray[0]

    void updateActiveQuest({
      leaderId: newLeader.id,
      players: [],
      index: activeQuest.index + 1,
      votesToApprove: {},
      votesToSucceed: {},
    })

    void goToStep({
      step: "questMemberSelect",
    })
  }

  return (
    <>
      <Divider description={hasPassed ? "The Vote has passed" : "The Vote has failed"} />

      <div className={classes(styles.container, className)}>{renderVotes()}</div>

      <MenuBar showContinue={isMyPlayerHost} onContinue={onContinue} />
    </>
  )
}
