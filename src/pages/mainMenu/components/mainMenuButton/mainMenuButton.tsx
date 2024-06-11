import { classes } from "utils";

import backgroundImage1 from "assets/images/mainMenu/buttonBackground1.webp";
import backgroundImage2 from "assets/images/mainMenu/buttonBackground2.webp";
import backgroundImage3 from "assets/images/mainMenu/buttonBackground3.webp";
import backgroundImage4 from "assets/images/mainMenu/buttonBackground4.webp";
import merlinImage from "assets/images/characters/merlin.webp";
import percivalImage from "assets/images/characters/percival.webp";
import clericImage from "assets/images/characters/cleric.webp";
import assassinImage from "assets/images/characters/assassin.webp";
import morganaImage from "assets/images/characters/morgana.webp";
import oberonImage from "assets/images/characters/oberon.webp";

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
