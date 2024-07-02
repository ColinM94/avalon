import { charactersDefault } from "consts";
import { CharacterCard, Modal } from "components";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const CharacterModal = (props: Props) => {
  const { characterId, show, setShow } = props;

  return (
    <Modal show={show} setShow={setShow}>
      <CharacterCard
        character={charactersDefault[characterId]}
        alwaysActive
        showDescription
        showName
        orientation="landscape"
        className={styles.character}
      />
    </Modal>
  );
};
