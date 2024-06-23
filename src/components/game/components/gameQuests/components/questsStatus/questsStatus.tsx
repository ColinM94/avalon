import { classes } from "utils";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsStatus = ({ state, className }: Props) => {
  const { index, status } = quest;

  const quests = () => {
    const items = [];

    for (let i = 1; i <= 5; i++) {
      let quest = state.session.quest1;

      // TODO: replace this shitty fix for a TS error.
      if (i === 2) quest = state.session.quest2;
      if (i === 3) quest = state.session.quest2;
      if (i === 4) quest = state.session.quest2;
      if (i === 5) quest = state.session.quest2;

      items.push(
        <div
          className={classes(
            styles.container,
            status === "fail" && styles.failed,
            status === "success" && styles.succeeded,
            className
          )}
        >
          Q {index}
        </div>
      );
    }

    return items;
  };

  return { quests };
};
