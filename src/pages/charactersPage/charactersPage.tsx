import { charactersDefault } from "consts";
import { CharacterCard } from "components";
import { MainLayout } from "layouts";

import styles from "./styles.module.scss";

export const CharactersPage = () => {
  const characters = Object.values(charactersDefault);

  // const handleCharacterClick = (characterId: string) => {};

  return (
    <MainLayout
      showHeader
      showBackButton
      heading="Characters"
      className={styles.container}
    >
      {characters.map((character) => (
        <CharacterCard
          character={character}
          // onClick={handleCharacterClick}
          alwaysActive
          showName
          orientation="landscape"
          showDescription
          disableAnimation
          key={character.id}
          className={styles.character}
        />
      ))}
    </MainLayout>
  );
};
