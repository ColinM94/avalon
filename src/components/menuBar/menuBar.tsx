import { classes } from "utils";
import { useSessionStore } from "stores";

import { MenuBarMenuButton } from "./components/menuBarMenuButton/menuBarMenuButton";
import { MenuBarReadyButton } from "./components/menuBarReadyButton/menuBarReadyButton";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const BottomBar = (props: Props) => {
  const { className } = props;

  useSessionStore();

  return (
    <>
      <div className={classes(styles.container, className)}>
        <MenuBarMenuButton />

        <MenuBarReadyButton />

        <div className={styles.rightSpace} />
      </div>
    </>
  );
};
