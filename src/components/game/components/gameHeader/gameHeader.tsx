import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";

import { classes } from "utils";
import { useToastStore } from "stores";
import { deleteDocument, updateDocument } from "services";
import { User } from "types";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameHeader = (props: Props) => {
  const { session, user, isHost, className } = props;

  const { showToast } = useToastStore();

  const handleLeave = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to leave? This will end the game for everyone!"
      );

      if (!confirmed) return;

      const promises = [
        updateDocument({
          id: session.id,
          collection: "sessions",
          data: {
            [`players.${user.id}`]: deleteField(),
          },
        }),
        updateDocument<User>({
          id: user.id,
          collection: "users",
          data: {
            sessionId: null,
          },
        }),
      ];

      if (isHost || session.step !== "lobby") {
        promises.push(
          deleteDocument({
            id: session.id,
            collection: "sessions",
          })
        );

        await Promise.all(promises);
      }
    } catch (error) {
      showToast(String(error));
    }
  };

  const heading = () => {
    switch (session.step) {
      case "lobby":
        return "Lobby";
      case "characterReveal":
        return "Character Reveal";
      case "ritual":
        return "Ritual";
      case "quests":
        return "Quests";
    }
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.heading}>{heading()}</div>
      <div onClick={handleLeave} className={styles.leaveButton}>
        <FontAwesomeIcon icon="x" className={styles.leaveButtonIcon} />
      </div>
    </div>
  );
};
