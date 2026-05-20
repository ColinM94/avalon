import { useLocation } from "wouter"

import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { Button } from "components/button/button"
import { deleteField } from "firebase/firestore"
import { deleteDocument } from "services/firestore/deleteDocument"
import { updateDocument } from "services/firestore/updateDocument"
import { updateSession } from "services/session/updateSession"
import { useToastStore } from "stores/useToastStore/useToastStore"
import { User } from "types/user"

import { Props } from "./types"
import styles from "./styles.module.scss"

export const Header = (props: Props) => {
  const { headingTitle, showBackButton } = props

  const { myPlayer, isMyPlayerHost, session } = useSessionStore()

  const [, navigate] = useLocation()

  const { showToast } = useToastStore()

  const handleLeave = async () => {
    try {
      const confirmed = confirm("Are you sure you want to leave? This will end the game for everyone!")

      if (!confirmed) return

      const promises = [
        updateDocument<User>({
          id: myPlayer.id,
          collection: "users",
          data: {
            sessionId: null,
          },
        }),
      ]

      if (session.step === "lobby") {
        promises.push(
          updateSession({
            [`players.${myPlayer.id}`]: deleteField(),
          }),
        )
      }

      if (isMyPlayerHost || session.step !== "lobby") {
        promises.push(
          deleteDocument({
            id: session.id,
            collection: "sessions",
          }),
        )
      }

      navigate("/")

      await Promise.all(promises)
    } catch (error) {
      showToast(String(error))
    }
  }

  return (
    <div className={styles.container}>
      {showBackButton && (
        <Button
          icon="arrow-left"
          onClick={() => navigate("/")}
          className={styles.backButton}
          iconClassName={styles.buttonIcon}
        />
      )}

      <div className={styles.heading}>
        <div className={styles.headingTitle}>{headingTitle}</div>
      </div>

      {session.id && (
        <Button icon="x" onClick={handleLeave} className={styles.closeButton} iconClassName={styles.buttonIcon} />
      )}
    </div>
  )
}
