import { QuestsQuest } from "./components/questsQuest/questsQuest";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuests = ({ state, setIsReady }: Props) => {
  const quests = () => {
    const items = [];

    for (let i = 1; i <= 5; i++) {
      let quest = state.session.quest1;

      // TODO: replace this shitty fix for a TS error.
      if (i === 2) quest = state.session.quest2;
      if (i === 3) quest = state.session.quest2;
      if (i === 4) quest = state.session.quest2;
      if (i === 5) quest = state.session.quest2;

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
