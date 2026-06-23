import { useLocation } from "wouter";

import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Button } from "components/button/button";
import { deleteField } from "firebase/firestore";
import { deleteDocument } from "services/firestore/deleteDocument";
import { updateDocument } from "services/firestore/updateDocument";
import { updateSession } from "services/session/updateSession";
import { User } from "types/user";
import { useAppStore } from "stores/useAppStore/useAppStore";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Header = (props: Props) => {
  const { headingTitle, showBackButton } = props;

  const { step, myPlayer, isMyPlayerHost, sessionId } = useSessionStore();
  const { showToast } = useAppStore();

  const [, navigate] = useLocation();

  const handleLeave = async () => {
    try {
      const confirmed = confirm("Are you sure you want to leave? This will end the game for everyone!");

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

      if (step === "lobby") {
        promises.push(
          updateSession({
            [`players.${myPlayer.id}`]: deleteField(),
          }),
        );
      }

      if (isMyPlayerHost || step !== "lobby") {
        promises.push(
          deleteDocument({
            id: sessionId,
            collection: "sessions",
          }),
        );
      }

      navigate("/");

      await Promise.all(promises);
    } catch (error) {
      const err = error as Error;
      showToast(err.message, "error");
    }
  };

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

      {sessionId && (
        <Button icon="x" onClick={handleLeave} className={styles.closeButton} iconClassName={styles.buttonIcon} />
      )}
    </div>
  );
};
