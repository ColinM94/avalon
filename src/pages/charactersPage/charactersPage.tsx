import { MainLayout } from "layouts/mainLayout/mainLayout";
import { CharacterCard } from "components/characterCard/characterCard";
import { charactersDefault } from "consts/defaults";

import styles from "./styles.module.scss";

export const CharactersPage = () => {
  const characters = Object.values(charactersDefault);

  return (
    <MainLayout showHeader showBackButton heading="Characters" className={styles.container}>
      {characters.map((character) => (
        <CharacterCard
          character={character}
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
