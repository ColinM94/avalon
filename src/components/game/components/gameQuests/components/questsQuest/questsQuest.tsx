import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsQuest = ({ quest, className }: Props) => {
  const { index, status } = quest;

  return (
    <div
      className={classes(
        styles.container,
        status === "fail" && styles.failed,
        status === "success" && styles.succeeded,
        className
      )}
    >
      <div className={styles.text}>
        <span className={styles.q}>Q</span>
        <span className={styles.u}>u</span>
        <span className={styles.e}>e</span>
        <span className={styles.s}>s</span>
        <span className={styles.t}>t</span>
        <span className={styles.space}></span>
        <span className={styles.num}>{index}</span>
      </div>
    </div>
  );
};
