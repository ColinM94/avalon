import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";
import { Button } from "components/button/button";
import { Modal } from "components/modal/modal";
import { capitaliseFirstLetter } from "utils/capitaliseFirstLetter";
import { classes } from "utils/classes";
import { characters } from "consts/characters";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";

import styles from "./styles.module.scss";
import { leaveSession } from "services/session/leaveSession";

export const MenuBarMenuButton = () => {
  const { myPlayer, step } = useSessionStore();

  const [showMenu, setShowMenu] = React.useState(false);
  const [showCharacter, setShowCharacter] = React.useState(false);

  const isLobby = step === "lobby";

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

          <div className={classes(styles.menuItemText, step === "lobby" && styles.menuItemDisabled)}>
            <div className={styles.menuItemTextTitle}>
              {showCharacter ? capitaliseFirstLetter(characters[myPlayer.characterId].id) : "Your Character"}
            </div>
            <div className={styles.menuItemTextDescription}>
              Hold down to see your character. Do not let anyone see!
            </div>
          </div>
        </div>

        <div onClick={leaveSession} className={styles.menuItem}>
          <FontAwesomeIcon icon="right-from-bracket" className={styles.menuItemIcon} />

          <div className={styles.menuItemText}>
            <div className={styles.menuItemTextTitle}>Quit</div>
            <div className={styles.menuItemTextDescription}>This will end the game for everyone</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
