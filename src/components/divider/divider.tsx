import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Divider = (props: Props) => {
  const { direction = "horizontal", className } = props;

  return (
    <div
      className={classes(
        direction === "horizontal" ? styles.horizontal : styles.vertical,
        className
      )}
    />
  );
};
