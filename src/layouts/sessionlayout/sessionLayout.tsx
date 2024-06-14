import { classes } from "utils";
import { leaveSession } from "services";
import { useAppStore } from "stores";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const SessionLayout = (props: Props) => {
  const { children, className } = props;

  const { session, user } = useAppStore();

  const handleLeave = async () => {
    const confirmed = confirm(
      "Are you sure you want to leave? This will end the game for everyone!"
    );

    if (confirmed) {
      await leaveSession();
    }
  };

  return (
    <div className={styles.container}>
      <div onClick={handleLeave} className={styles.leaveButton}>
        X
      </div>

      {session && user && (
        <div className={classes(styles.content, className)}>{children}</div>
      )}

      {!session && !user && <div>...loading</div>}
    </div>
  );
};
