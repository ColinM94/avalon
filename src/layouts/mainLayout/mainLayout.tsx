import { classes } from "utils";
import { leaveSession } from "services";

import { Header } from "./components/header/header";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const MainLayout = (props: Props) => {
  const {
    showHeader,
    showBackButton,
    showLeaveButton,
    heading,
    children,
    className,
  } = props;

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
      {showHeader && (
        <Header heading={heading} showBackButton={showBackButton} />
      )}

      {showLeaveButton && (
        <div onClick={handleLeave} className={styles.leaveButton}>
          X
        </div>
      )}

      <div className={classes(styles.content, className)}>{children}</div>
    </div>
  );
};
