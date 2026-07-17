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

  const [selectedCharacters, setSelectedCharacters] = React.useState<CharacterId[]>(["merlin", "assassin"]);

  const goodCharacters = Object.values(charactersDefault).filter(
    (character) =>
      character.allegiance === "good" &&
      !(["merlin", "servant1", "servant2", "servant3", "servant4", "servant5"] as CharacterId[]).includes(character.id),
  );
  const evilCharacters = Object.values(charactersDefault).filter(
    (character) =>
      character.allegiance === "evil" &&
      !(["assassin", "minion1", "minion2", "minion3"] as CharacterId[]).includes(character.id),
  );

  const numActiveGoodCharacters = selectedCharacters.filter((characterId) =>
    goodCharacters.find((character) => character.id === characterId),
  ).length;

  const numActiveEvilCharacters = selectedCharacters.filter((characterId) =>
    evilCharacters.find((character) => character.id === characterId),
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
            selectedCharacters={selectedCharacters}
            characters={goodCharacters.map((character) => character.id)}
            maxActiveCharacters={maxGoodCharacters}
            setCharacters={setSelectedCharacters}
            numActiveCharacters={numActiveGoodCharacters}
            className={styles.section}
          />

          <SetupCharacters
            heading="Evil Characters"
            allegiance="evil"
            selectedCharacters={selectedCharacters}
            characters={evilCharacters.map((character) => character.id)}
            maxActiveCharacters={maxEvilCharacters}
            setCharacters={setSelectedCharacters}
            numActiveCharacters={numActiveEvilCharacters}
            className={styles.section}
          />
        </>
      )}

      {!isMyPlayerHost && <StepDescription heading="Please Wait" description="The Host is selecting Characters." />}

      <MenuBar
        showContinue={isMyPlayerHost}
        canContinue={() => setupCanContinue(numActiveGoodCharacters, numActiveEvilCharacters)}
        onContinue={() => setupContinue(selectedCharacters)}
      />
    </>
  );
};
