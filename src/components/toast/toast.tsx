import * as React from "react";

import { classes } from "utils";
import { useToastStore } from "stores";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const Toast = ({ className }: Props) => {
  const { toast } = useToastStore();

  const [fadeOut, setFadeOut] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [toast?.createdAt]);

  React.useEffect(() => {
    setFadeOut(false);
  }, [toast?.createdAt]);

  return (
    <div
      className={classes(
        styles.container,
        className,
        fadeOut && styles.fadeOut
      )}
    >
      <div className={styles.toast}>{toast?.text}</div>
    </div>
  );
};
