import { classes } from "utils";
import { characterNames } from "consts";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const CharacterCard = (props: Props) => {
  const { character, onClick, className } = props;

  const classNames = classes(
    styles.container,
    className,
    character.isActive && character.allegiance === "good" && styles.activeGood,
    character.isActive && character.allegiance === "evil" && styles.activeEvil,
    character.allegiance === "good" && styles.good,
    character.allegiance === "evil" && styles.evil
  );

  return (
    <div onClick={() => onClick(character.id)} className={classNames}>
      {characterNames[character.id] || character.id}
    </div>
  );
};
