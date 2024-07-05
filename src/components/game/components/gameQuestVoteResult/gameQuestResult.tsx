import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestResult = (props: Props) => {
  const { className } = props;

  return <div className={classes(styles.container, className)}></div>;
};
