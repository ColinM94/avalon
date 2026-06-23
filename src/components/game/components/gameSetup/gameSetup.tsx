import * as React from "react";

import { MenuBar } from "components/menuBar/menuBar";
import { StepDescription } from "components/stepDescription/stepDescription";
import { maxCharacters } from "consts/characters";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { Characters } from "types/characters";
import { mergeReducer } from "utils/mergeReducer";
import { setupCanContinue, setupContinue } from "services/session/logic";
import { charactersDefault } from "consts/defaults";

import { SetupCharacters } from "./components/setupCharacters/setupCharacters";

import styles from "./styles.module.scss";

export const GameSetup = () => {
  const { numPlayers, isMyPlayerHost } = useSessionStore();

  const [characters, updateCharacters] = React.useReducer(mergeReducer<Characters>, charactersDefault);

  const numActiveGoodCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "good" && character.isActive,
  ).length;

  const numActiveEvilCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "evil" && character.isActive,
  ).length;

  const maxGoodCharacters = maxCharacters[numPlayers]?.good;
  const maxEvilCharacters = maxCharacters[numPlayers]?.evil;

  return (
    <>
      {isMyPlayerHost && (
        <>
          <SetupCharacters
            heading="Good Characters"
            allegiance="good"
            characters={characters}
            maxActiveCharacters={maxGoodCharacters}
            updateCharacters={updateCharacters}
            numActiveCharacters={numActiveGoodCharacters}
            className={styles.section}
          />

          <SetupCharacters
            heading="Evil Characters"
            allegiance="evil"
            characters={characters}
            maxActiveCharacters={maxEvilCharacters}
            updateCharacters={updateCharacters}
            numActiveCharacters={numActiveEvilCharacters}
            className={styles.section}
          />
        </>
      )}

      {!isMyPlayerHost && <StepDescription heading="Please Wait" description="The Host is selecting Characters." />}

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={() => setupCanContinue(characters)}
        onContinue={() => setupContinue(characters)}
      />
    </>
  );
};
