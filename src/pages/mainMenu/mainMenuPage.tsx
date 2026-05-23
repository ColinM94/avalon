import { useLocation } from "wouter"

import { sessionDefault } from "consts/sessionDefault"
import { MainLayout } from "layouts/mainLayout/mainLayout"
import { setDocument } from "services/firestore/setDocument"
import { useAppStore } from "stores/useAppStore/useAppStore"
import { useToastStore } from "stores/useToastStore/useToastStore"
import { GameSession } from "types/gameSession"
import { generateLobbyCode } from "utils/generateLobbyCode"

import { MainMenuButton } from "./components/mainMenuButton/mainMenuButton"
import styles from "./styles.module.scss"

export const MainMenuPage = () => {
  const [, navigate] = useLocation()

  const { user } = useAppStore()
  const { showToast } = useToastStore()

  const handleCreateSession = async () => {
    try {
      const id = generateLobbyCode()

      const result = await setDocument<GameSession>({
        id: id,
        collection: "sessions",
        data: {
          ...sessionDefault(),
          id,
          createdBy: user.id,
        },
      })

      if (!result) throw new Error("Error creating game session")

      navigate(`/play/${id}`)
    } catch (error) {
      showToast(String(error), "error")
    }
  }

  const handleJoinLobby = () => {
    navigate(`/join`)
  }

  const handleRules = () => {
    navigate("/rules")
  }

  const handleCharacters = () => {
    navigate("/characters")
  }

  return (
    <MainLayout className={styles.container}>
      <div className={styles.heading}>Avalon</div>

      <div className={styles.buttons}>
        <MainMenuButton label="Create" position={1} onClick={handleCreateSession} className={styles.button} />

        <MainMenuButton label="Join" position={2} onClick={handleJoinLobby} className={styles.button} />

        <MainMenuButton label="Rules" position={3} onClick={handleRules} className={styles.button} />

        <MainMenuButton label="Characters" position={4} onClick={handleCharacters} className={styles.button} />
      </div>

      <div className={styles.footer}>
        <div className={styles.createdBy}>Created by Colin Maher</div>
      </div>
    </MainLayout>
  )
}
