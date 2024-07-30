import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";

import { capitaliseFirstLetter, classes } from "utils";
import { Button, Modal } from "components";
import { useSessionStore, useToastStore } from "stores";
import { deleteDocument, updateDocument, updateSession } from "services";
import { User } from "types";

import styles from "./styles.module.scss";
import { charactersDefault } from "consts";

export const BottomBarMenuButton = () => {
  const navigate = useNavigate();
  const { myPlayer, session, isMyPlayerHost } = useSessionStore();
  const { showToast } = useToastStore();

  const [showMenu, setShowMenu] = React.useState(false);
  const [showCharacter, setShowCharacter] = React.useState(false);

  const handleLeave = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to leave? This will end the game for everyone!"
      );

      if (!confirmed) return;

      const promises = [
        updateDocument<User>({
          id: myPlayer.id,
          collection: "users",
          data: {
            sessionId: null,
          },
        }),
      ];

      if (session.step === "lobby") {
        promises.push(
          updateSession({
            [`players.${myPlayer.id}`]: deleteField(),
          })
        );
      }

      if (isMyPlayerHost || session.step !== "lobby") {
        promises.push(
          deleteDocument({
            id: session.id,
            collection: "sessions",
          })
        );
      }

      navigate("/");

      await Promise.all(promises);
    } catch (error) {
      showToast(String(error));
    }
  };

  const isLobby = session.step === "lobby";

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

          <div
            className={classes(
              styles.menuItemText,
              session.step === "lobby" && styles.menuItemDisabled
            )}
          >
            <div className={styles.menuItemTextTitle}>
              {showCharacter
                ? capitaliseFirstLetter(
                    charactersDefault[myPlayer.characterId].id
                  )
                : "Your Character"}
            </div>
            <div className={styles.menuItemTextDescription}>
              Hold down to see your character. Do not let anyone see!
            </div>
          </div>
        </div>

        <div onClick={handleLeave} className={styles.menuItem}>
          <FontAwesomeIcon
            icon="right-from-bracket"
            className={styles.menuItemIcon}
          />

          <div className={styles.menuItemText}>
            <div className={styles.menuItemTextTitle}>Quit</div>
            <div className={styles.menuItemTextDescription}>
              This will end the game for everyone
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
