import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsStatus = ({ state, className }: Props) => {
  const quests = () => {
    const items = [];

    for (let i = 0; i < 5; i++) {
      let quest = state.session.quests[i];

      items.push(
        <div
          key={i}
          className={classes(
            styles.quest,
            quest.status === "fail" && styles.questFailed,
            quest.status === "success" && styles.questSucceeded
          )}
        >
          Q {i + 1}
        </div>
      );
    }

    return items;
  };

  return <div className={classes(styles.container, className)}>{quests()}</div>;
};
