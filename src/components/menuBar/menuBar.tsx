import { classes } from "utils/classes";
import { Debug } from "components/debug/debug";
import { isDev } from "consts/general";

import { MenuBarMenuButton } from "./components/menuBarMenuButton/menuBarMenuButton";
import { MenuBarReadyButton } from "./components/menuBarReadyButton/menuBarReadyButton";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const MenuBar = (props: Props) => {
  const { canContinue, canReady, onContinue, onReady, showContinueToLeader, hideReadyButton, className } = props;

  return (
    <div className={classes(styles.container, className)}>
      <MenuBarMenuButton />

      <MenuBarReadyButton
        canContinue={canContinue}
        canReady={canReady}
        onContinue={onContinue}
        onReady={onReady}
        hideReadyButton={hideReadyButton}
        showContinueToLeader={showContinueToLeader}
      />

      {isDev && <Debug />}

      {!isDev && <div className={styles.rightSpace} />}
    </div>
  );
};
