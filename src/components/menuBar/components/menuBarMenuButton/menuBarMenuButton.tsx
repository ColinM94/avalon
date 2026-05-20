import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { deleteField } from "firebase/firestore"
import { useLocation } from "wouter"

import { Button } from "components/button/button"
import { Modal } from "components/modal/modal"
import { charactersDefault } from "consts/characters"
import { deleteDocument } from "services/firestore/deleteDocument"
import { updateDocument } from "services/firestore/updateDocument"
import { updateSession } from "services/session/updateSession"
import { useSessionStore } from "stores/useSessionStore/useSessionStore"
import { useToastStore } from "stores/useToastStore/useToastStore"
import { User } from "types/user"
import { capitaliseFirstLetter } from "utils/capitaliseFirstLetter"
import { classes } from "utils/classes"

import styles from "./styles.module.scss"

export const MenuBarMenuButton = () => {
  const [, navigate] = useLocation()

  const { myPlayer, session, isMyPlayerHost } = useSessionStore()
  const { showToast } = useToastStore()

  const [showMenu, setShowMenu] = React.useState(false)
  const [showCharacter, setShowCharacter] = React.useState(false)

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

  const isLobby = session.step === "lobby"

  return (
    <>
      <Button
        icon="ellipsis-v"
        onClick={() => setShowMenu(true)}
        iconClassName={styles.leaveButtonIcon}
        className={styles.leaveButton}
      />

      <Modal show={showMenu} setShow={setShowMenu} className={styles.menu}>
        <div
          onMouseDown={() => !isLobby && setShowCharacter(true)}
          onMouseUp={() => !isLobby && setShowCharacter(false)}
          onTouchStart={() => !isLobby && setShowCharacter(true)}
          onTouchEnd={() => !isLobby && setShowCharacter(false)}
          className={styles.menuItem}
        >
          <FontAwesomeIcon icon="hat-wizard" className={styles.menuItemIcon} />

          <div className={classes(styles.menuItemText, session.step === "lobby" && styles.menuItemDisabled)}>
            <div className={styles.menuItemTextTitle}>
              {showCharacter ? capitaliseFirstLetter(charactersDefault[myPlayer.characterId].id) : "Your Character"}
            </div>
            <div className={styles.menuItemTextDescription}>
              Hold down to see your character. Do not let anyone see!
            </div>
          </div>
        </div>

        <div onClick={handleLeave} className={styles.menuItem}>
          <FontAwesomeIcon icon="right-from-bracket" className={styles.menuItemIcon} />

          <div className={styles.menuItemText}>
            <div className={styles.menuItemTextTitle}>Quit</div>
            <div className={styles.menuItemTextDescription}>This will end the game for everyone</div>
          </div>
        </div>
      </Modal>
    </>
  )
}
