import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Divider = (props: Props) => {
  const { direction = "horizontal", label, description, className } = props;

  return (
    <>
      <div
        className={classes(
          styles.container,
          direction === "horizontal" ? styles.horizontal : styles.vertical,
          className
        )}
      >
        {label && <div className={styles.label}>{label}</div>}
      </div>

      {description && <div className={styles.description}>{description}</div>}
    </>
  );
};
