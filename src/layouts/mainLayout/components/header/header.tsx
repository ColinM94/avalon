import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { deleteDocument, updateDocument, updateSession } from "services";
import { useSessionStore, useToastStore } from "stores";
import { deleteField } from "firebase/firestore";
import { User } from "types";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Header = (props: Props) => {
  const { heading, showBackButton } = props;

  const { myPlayer, isHost, session } = useSessionStore();

  const navigate = useNavigate();
  const { showToast } = useToastStore();

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

      if (isHost || session.step !== "lobby") {
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

      <div className={styles.heading}>{heading}</div>

      {session.id && (
        <Button
          icon="x"
          onClick={handleLeave}
          className={styles.closeButton}
          iconClassName={styles.buttonIcon}
        />
      )}
    </div>
  );
};
