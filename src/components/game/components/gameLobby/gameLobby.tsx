import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { MenuBar } from "components/menuBar/menuBar"
import { lobbyCanContinue, lobbyCanReady, lobbyContinue } from "services/session/validation"

import { GameLobbyProfile } from "./components/gameLobbyProfile/gameLobbyProfile"
import { GameLobbyInfo } from "./components/gameLobbyInfo/gameLobbyInfo"

import styles from "./styles.module.scss"

export const GameLobby = () => {
  const { isMyPlayerHost } = useSessionStore()

  return (
    <>
      <GameLobbyInfo className={styles.info} />

      <GameLobbyProfile className={styles.profile} />

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={lobbyCanContinue}
        onContinue={lobbyContinue}
        canReady={lobbyCanReady}
      />
    </>
  )
}
