import { classes } from "utils"
import { Divider, LoadingOverlay, MenuBar, PlayerCard } from "components"
import { useSessionStore } from "stores"
import { goToStep, updateSession } from "services"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const GameQuestMemberSelect = (props: Props) => {
  const { className } = props

  const { players, playersArray, myPlayer, session, activeQuest, isMyPlayerLeader } = useSessionStore()

  const isMaxPlayers = activeQuest.players.length >= activeQuest.numPlayers

  const handleClick = (playerId: string) => {
    if (activeQuest.leaderId !== myPlayer.id || myPlayer.isReady) return

    const updatedQuestPlayers = activeQuest.players

    if (updatedQuestPlayers.includes(playerId)) {
      updatedQuestPlayers.splice(updatedQuestPlayers.indexOf(playerId), 1)
    } else if (!isMaxPlayers) {
      updatedQuestPlayers.push(playerId)
    } else {
      return
    }

    const updatedQuests = structuredClone(session.quests)

    updatedQuests[activeQuest.index].players = updatedQuestPlayers

    updateSession({
      quests: updatedQuests,
    })
  }

  const canContinue = () => {
    if (activeQuest.numPlayers !== activeQuest.players.length) {
      return `Please select ${activeQuest.numPlayers} players.`
    }

    return true
  }

  const handleContinue = () => {
    goToStep({
      step: "questMemberVote",
    })
  }

  if (!activeQuest.leaderId) return <LoadingOverlay />

  return (
    <>
      <Divider
        description={
          isMyPlayerLeader
            ? `Select ${activeQuest.numPlayers} people to go on the this quest`
            : `${players[activeQuest.leaderId]?.name} is selecting ${
                activeQuest.numPlayers
              } player(s) to go on this Quest`
        }
      />

      <div className={classes(styles.container, className)}>
        {isMyPlayerLeader &&
          playersArray.map((player) => {
            const isSelected = activeQuest.players.includes(player.id)

            return (
              <PlayerCard
                player={player}
                onClick={() => handleClick(player.id)}
                showName
                key={player.id}
                className={classes(styles.player, isSelected ? styles.playerSelected : styles.playerDisabled)}
              />
            )
          })}
      </div>

      <MenuBar showContinue={isMyPlayerLeader} canContinue={canContinue} onContinue={handleContinue} />
    </>
  )
}
