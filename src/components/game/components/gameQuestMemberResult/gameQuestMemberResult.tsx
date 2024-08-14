import * as React from "react"

import { classes } from "utils"
import { useSessionStore } from "stores"
import { goToStep, updateActiveQuest, updateSession } from "services"
import { Divider, MenuBar } from "components"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const GameQuestMemberResult = (props: Props) => {
  const { className } = props

  const { activeQuest, isMyPlayerHost, myPlayer, playersArray, session, isAllReady } = useSessionStore()

  const votes = Object.values(activeQuest.votesToApprove).sort((a, b) => Number(b) - Number(a))

  const hasPassed = Boolean(votes.filter((vote) => vote).length > votes.length / 2)

  const renderVotes = () => {
    const items: React.ReactNode[] = []

    votes.forEach((vote) => {
      items.push(<div className={vote ? styles.yesVote : styles.noVote}>{vote ? "Success" : "Fail"}</div>)
    })

    return items
  }

  React.useEffect(() => {
    if (!isMyPlayerHost || !myPlayer.isReady) return

    if (hasPassed) {
      goToStep({
        step: "questVote",
      })
    } else {
      const currentLeaderIndex = playersArray.findIndex((item) => item.id === activeQuest.leaderId)
      const newLeader = playersArray?.[currentLeaderIndex + 1] || playersArray[0]

      updateActiveQuest({
        leaderId: newLeader.id,
        players: [],
      })

      updateSession({
        numFailVotes: Number(session.numFailVotes) + 1,
      })

      goToStep({
        step: "questMemberSelect",
      })
    }
  }, [myPlayer.isReady])

  const canContinue = () => {
    if (!isAllReady) return "All players are not ready"

    return true
  }

  const onContinue = () => {
    goToStep({
      step: "questMemberSelect",
    })
  }

  return (
    <>
      <Divider description={hasPassed ? "The Vote has passed" : "The Vote has failed"} />

      <div className={classes(styles.container, className)}>{renderVotes()}</div>

      <MenuBar showContinue={isMyPlayerHost} canContinue={canContinue} onContinue={onContinue} />
    </>
  )
}
