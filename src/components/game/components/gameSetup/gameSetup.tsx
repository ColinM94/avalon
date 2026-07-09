import * as React from "react";

import { MenuBar } from "components/menuBar/menuBar";
import { StepDescription } from "components/stepDescription/stepDescription";
import { maxCharacters } from "consts/characters";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { setupCanContinue, setupContinue } from "services/session/logic";
import { charactersDefault } from "consts/defaults";
import { CharacterId } from "types/general";

import { SetupCharacters } from "./components/setupCharacters/setupCharacters";

import styles from "./styles.module.scss";

export const GameSetup = () => {
  const { numPlayers, isMyPlayerHost } = useSessionStore();

  // const [characters, updateCharacters] = React.useReducer(mergeReducer<Characters>, charactersDefault);

  const [selectedCharacters, setSelectedCharacters] = React.useState<CharacterId[]>([]);

  const goodCharacters = Object.values(charactersDefault).filter((character) => character.allegiance === "good");
  const evilCharacters = Object.values(charactersDefault).filter((character) => character.allegiance === "evil");

  const maxGoodCharacters = maxCharacters[numPlayers]?.good;
  const maxEvilCharacters = maxCharacters[numPlayers]?.evil;

  return (
    <>
      {isMyPlayerHost && (
        <>
          <SetupCharacters
            heading="Good Characters"
            allegiance="good"
            characters={goodCharacters.map((character) => character.id)}
            maxActiveCharacters={maxGoodCharacters}
            setCharacters={setSelectedCharacters}
            numActiveCharacters={goodCharacters.length}
            className={styles.section}
          />

          <SetupCharacters
            heading="Evil Characters"
            allegiance="evil"
            characters={evilCharacters.map((character) => character.id)}
            maxActiveCharacters={maxEvilCharacters}
            setCharacters={setSelectedCharacters}
            numActiveCharacters={goodCharacters.length}
            className={styles.section}
          />
        </>
      )}

      {!isMyPlayerHost && <StepDescription heading="Please Wait" description="The Host is selecting Characters." />}

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={() => setupCanContinue(goodCharacters.length, evilCharacters.length)}
        onContinue={() => setupContinue(selectedCharacters)}
      />
    </>
  );
};
