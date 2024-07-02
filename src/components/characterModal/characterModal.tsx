import { charactersDefault } from "consts";
import { CharacterCard, Heading, Modal } from "components";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const CharacterModal = (props: Props) => {
  const { characterId, show, setShow, headingTitle, headingSubtitle } = props;

  return (
    <Modal show={show} setShow={setShow}>
      {headingTitle && (
        <Heading
          headingTitle={headingTitle}
          headingSubtitle={headingSubtitle}
        />
      )}

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
