import { charactersDefault } from "consts";
import { CharacterCard, Header } from "components";

import styles from "./styles.module.scss";

export const CharactersPage = () => {
  const characters = Object.values(charactersDefault);

  const handleCharacterClick = (characterId: string) => {};

  return (
    <>
      <Header heading="Characters" />

      <div className={styles.container}>
        {characters.map((character) => (
          <CharacterCard
            character={character}
            onClick={handleCharacterClick}
            alwaysActive
            showName
            orientation="landscape"
            showDescription
            className={styles.character}
          />
        ))}
      </div>
    </>
  );
};
