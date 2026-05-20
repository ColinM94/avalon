import { CharacterCard } from "components/characterCard/characterCard"
import { Heading } from "components/heading/heading"
import { Modal } from "components/modal/modal"
import { charactersDefault } from "consts/characters"
import { Props } from "./types"

import styles from "./styles.module.scss"

export const CharacterModal = (props: Props) => {
  const { characterId, show, setShow, headingTitle, headingSubtitle } = props

  return (
    <Modal show={show} setShow={setShow}>
      {headingTitle && <Heading headingTitle={headingTitle} headingSubtitle={headingSubtitle} />}

      <CharacterCard
        character={charactersDefault[characterId]}
        alwaysActive
        showDescription
        showName
        orientation="portrait"
        className={styles.character}
      />
    </Modal>
  )
}
