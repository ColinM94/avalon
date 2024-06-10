import { HomeInfo } from "./components/homeInfo/homeInfo";
import { HomeLobby } from "./components/homeLobby/homeLobby";

import styles from "./styles.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>Avalon</div>

      <HomeLobby className={styles.lobby} />
      {/* <HomeInfo className={styles.info} /> */}

      <div className={styles.footer}>
        <div className={styles.createdBy}>Created by Colin Maher</div>
      </div>
    </div>
  );
};
