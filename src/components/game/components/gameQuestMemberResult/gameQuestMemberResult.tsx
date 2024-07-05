import { classes } from "utils";
import { useSessionStore } from "stores";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuestMemberResult = (props: Props) => {
  const { className } = props;

  const { playersArray } = useSessionStore();

  const votes = () => {
    const items = [];

    for (let i = 0; i < playersArray.length; i++) {
      items.push(<div className={styles.vote}>Vote Result</div>);
    }

    return items;
  };

  return (
    <div className={classes(styles.container, className)}>
      <div className={styles.votes}>{votes()}</div>
    </div>
  );
};
