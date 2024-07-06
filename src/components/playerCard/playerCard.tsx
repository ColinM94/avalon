import { classes } from "utils";

// import myFace from "assets/images/myFace.jpg";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const PlayerCard = ({ player, className }: Props) => {
  return (
    <div className={classes(styles.container, className)}>
      {/* <img src={myFace} className={styles.image} /> */}

      {player.name}
    </div>
  );
};
