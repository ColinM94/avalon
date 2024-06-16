import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteField } from "firebase/firestore";

import { classes } from "utils";
import { useToastStore } from "stores";
import { deleteDocument, updateDocument } from "services";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const GameLeaveButton = (props: Props) => {
  const { session, user, className } = props;

  const { showToast } = useToastStore();

  const handleLeave = async () => {
    const confirmed = confirm(
      "Are you sure you want to leave? This will end the game for everyone!"
    );

    if (!confirmed) return;

    try {
      if (session.createdBy === user.id || session.step !== "lobby") {
        await deleteDocument({
          id: session.id,
          collection: "sessions",
        });

        return;
      }

      console.log("leave session");

      await updateDocument({
        id: session.id,
        collection: "sessions",
        data: {
          [`players.${user.id}`]: deleteField(),
        },
      });
    } catch (error) {
      showToast(String(error));
    }
  };

  return (
    <div onClick={handleLeave} className={classes(styles.container, className)}>
      <FontAwesomeIcon icon="x" className={styles.leaveButtonIcon} />
    </div>
  );
};
