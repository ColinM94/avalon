import { classes } from "utils";

import backgroundImage1 from "assets/images/00.png";
import backgroundImage2 from "assets/images/01.png";
import backgroundImage3 from "assets/images/02.png";
import backgroundImage4 from "assets/images/03.png";
import merlinImage from "assets/images/characters/merlin.png";
import percivalImage from "assets/images/characters/percival.png";
import clericImage from "assets/images/characters/cleric.png";
import assassinImage from "assets/images/characters/assassin.png";
import morganaImage from "assets/images/characters/morgana.png";
import oberonImage from "assets/images/characters/oberon.png";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const MainMenuButton = (props: Props) => {
  const { label, className, onClick, position, children } = props;

  const backgroundImage = () => {
    if (position === 1) return backgroundImage1;
    if (position === 2) return backgroundImage2;
    if (position === 3) return backgroundImage3;
    if (position === 4) return backgroundImage4;
  };

  return (
    <div onClick={onClick} className={classes(styles.container, className)}>
      <img src={backgroundImage()} className={styles.backgroundImage} />
      <div className={styles.label}>{label}</div>

      {children}

      {position === 4 && (
        <div className={styles.characters}>
          <img src={clericImage} className={styles.clericImage} />
          <img src={percivalImage} className={styles.percivalImage} />
          <img src={merlinImage} className={styles.merlinImage} />

          <img src={assassinImage} className={styles.assassinImage} />
          <img src={morganaImage} className={styles.morganaImage} />
          <img src={oberonImage} className={styles.oberonImage} />
        </div>
      )}
    </div>
  );
};
