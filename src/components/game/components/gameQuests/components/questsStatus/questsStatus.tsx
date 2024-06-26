import { classes } from "utils";
import { useSessionStore } from "stores";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const QuestsStatus = ({ className }: Props) => {
  const { session } = useSessionStore();

  const renderQuests = () => {
    const items = [];

    for (let i = 0; i < 5; i++) {
      let quest = session.quests[i];

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

  return (
    <div className={classes(styles.container, className)}>{renderQuests()}</div>
  );
};
