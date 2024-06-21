import { classes } from "utils";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Heading = (props: Props) => {
  const { headingTitle, headingSubtitle, rightText, className } = props;

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.heading}>
        <div className={styles.headingTitle}>{headingTitle}</div>
        <div className={styles.headingSubtitle}>{headingSubtitle}</div>
      </div>
      <div className={styles.rightText}>{rightText}</div>
    </div>
  );
};
