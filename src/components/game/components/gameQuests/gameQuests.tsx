import { QuestsStatus } from "./components/questsStatus/questsStatus";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const GameQuests = ({ state, setIsReady }: Props) => {
  return (
    <div className={styles.container}>
      You are Leader
      <QuestsStatus state={state} />
    </div>
  );
};
