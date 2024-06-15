import { Button, CharacterCard, Modal } from "components";
import { charactersDefault } from "consts";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const CharacterRevealer = (props: Props) => {
  const { characterId, show, setShow, onReveal } = props;

  return (
    <Modal show={show} setShow={setShow} className={styles.container}>
      <div className={styles.description}>
        Do not show anyone your character!
      </div>

      {show && charactersDefault[characterId] && (
        <CharacterCard
          character={charactersDefault[characterId]}
          clickToReveal
          showName
          disableAnimation
          showDescription
          alwaysActive
          orientation="landscape"
          onReveal={onReveal}
          className={styles.card}
        />
      )}
    </Modal>
  );
};
