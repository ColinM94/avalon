import { Quest } from "types";

import { QuestsQuest } from "./components/questsQuest/questsQuest";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuests = ({ session, isHost }: Props) => {
  const quests = () => {
    const items = [];

    for (let i = 1; i <= 5; i++) {
      const quest = session[`quest${i}`] as Quest;

      items.push(<QuestsQuest quest={quest} className={styles.quest} />);
    }

    return items;
  };

  return (
    <div className={styles.container}>
      <div className={styles.quests}>{quests()}</div>
    </div>
  );
};
