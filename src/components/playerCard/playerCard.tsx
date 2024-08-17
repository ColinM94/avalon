import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { deleteField } from "firebase/firestore"

import { classes } from "utils"
import { updateSession } from "services"
import { useSessionStore } from "stores"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const PlayerCard = (props: Props) => {
  const { player, connected = true, onClick, showName, showIsReady, showLeaderIcon, width = 1, className } = props

  const { myPlayer, activeQuest, isMyPlayerHost, session } = useSessionStore()

  const isMyPlayer = player?.id === myPlayer.id
  const showKick = isMyPlayerHost && player?.id !== myPlayer.id && connected
  const isLeader = activeQuest && activeQuest.leaderId && activeQuest?.leaderId === player?.id

  const handleKick = async () => {
    if (session.step !== "lobby") return

    const shouldKick = confirm(`Are you sure you want to kick ${player?.name}`)

    if (!shouldKick) return

    await updateSession({
      [`players.${player?.id}`]: deleteField(),
    })
  }

  const handleClick = () => {
    onClick?.()

    if (session.step !== "lobby") return

    if (showKick) handleKick()
  }

  const classNames = () => {
    return classes(
      className,
      styles.container,
      connected && styles.connected,
      player?.isMyPlayerHost && styles.host,
      // isMyPlayer && styles.user,
      width === 1 && styles.width1,
      width === 2 && styles.width2,
      width === 3 && styles.width3
    )
  }

  return (
    <>
      <div onClick={handleClick} className={classNames()}>
        {player?.imageUrl && <img src={player.imageUrl} className={styles.image} />}

        {connected && !player?.imageUrl && <FontAwesomeIcon icon="user" className={styles.playerIcon} />}

        {isLeader && showLeaderIcon && <FontAwesomeIcon icon="crown" className={styles.hostIcon} />}

        {showKick && session.step === "lobby" && <FontAwesomeIcon icon="x" className={styles.kickIcon} />}

        {connected === false && <FontAwesomeIcon icon="user" className={styles.waitingIcon} />}

        {/* {isMyPlayer && session.step === "lobby" && (
          <FontAwesomeIcon icon="pencil" className={styles.editIcon} />
        )} */}

        {showName && <div className={styles.name}>{player?.name || "Player"}</div>}

        {player?.isReady && showIsReady && <FontAwesomeIcon icon="check" className={styles.readyIcon} />}
      </div>
    </>
  )
}
