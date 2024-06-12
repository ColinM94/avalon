import { CharacterCard, Modal } from "components";
import { charactersDefault } from "consts";

import { Props } from "./types";
import styles from "./styles.module.scss";

export const CharacterRevealer = ({ characterId, show, setShow }: Props) => {
  return (
    <Modal show={show} setShow={setShow} className={styles.container}>
      <div className={styles.description}>
        Do not show anyone your character
      </div>

      {charactersDefault[characterId] && (
        <CharacterCard
          character={charactersDefault[characterId]}
          clickToReveal
          showName
          disableAnimation
          showDescription
          alwaysActive
          orientation="landscape"
          className={styles.card}
        />
      )}
    </Modal>
  );
};
