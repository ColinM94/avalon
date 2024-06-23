import { CharacterCard } from "components";
import { charactersDefault } from "consts";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const CharacterRevealer = (props: Props) => {
  const { characterId, show } = props;

  return (
    <>
      <div className={styles.description}>
        Do not show anyone your character!
      </div>

      {show && charactersDefault[characterId] && (
        <CharacterCard
          character={charactersDefault[characterId]}
          showName
          disableAnimation
          showDescription
          alwaysActive
          orientation="landscape"
          className={styles.card}
        />
      )}
    </>
  );
};
