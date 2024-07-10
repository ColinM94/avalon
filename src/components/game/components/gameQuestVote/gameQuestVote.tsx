import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestVote = (props: Props) => {
  const { className } = props;

  return (
    <div className={classes(styles.container, className)}>
      You are on a really cool quest to a goblin camp and then you realise this
      app isn't finished.
    </div>
  );
};
