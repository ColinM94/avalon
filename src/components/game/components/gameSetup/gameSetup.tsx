import * as React from "react";

import { MenuBar } from "components/menuBar/menuBar";
import { maxSpecialCharacters, characters } from "consts/characters";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { setupCanContinue, setupContinue } from "services/session/logic";
import { CharacterId } from "types/general";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { updateSession } from "services/session/updateSession";

import { SetupModule } from "./components/setupModule/setupModule";
import styles from "./styles.module.scss";

export const GameSetup = () => {
  const { showToast } = useAppStore();
  const { numPlayers, isMyPlayerHost, selectedCharacters } = useSessionStore();

  const goodCharacters = Object.values(characters).filter(
    (character) =>
      character.allegiance === "good" &&
      !(
        [
          "merlin",
          "rogueGood",
          "sorcererGood",
          "untrustworthyServant",
          "lancelotGood",
          "troublemaker",
          "cleric",
          "servant1",
          "servant2",
          "servant3",
          "servant4",
          "servant5",
        ] as CharacterId[]
      ).includes(character.id),
  );

  const evilCharacters = Object.values(characters).filter(
    (character) =>
      character.allegiance === "evil" &&
      !(["assassin", "lunatic", "sorcererEvil", "minion1", "minion2", "minion3"] as CharacterId[]).includes(
        character.id,
      ),
  );

  const numActiveGoodCharacters = selectedCharacters.filter((characterId) =>
    goodCharacters.find((character) => character.id === characterId),
  ).length;

  const numActiveEvilCharacters = selectedCharacters.filter((characterId) =>
    evilCharacters.find((character) => character.id === characterId),
  ).length;

  const maxGoodCharacters = maxSpecialCharacters[numPlayers]?.good;
  const maxEvilCharacters = maxSpecialCharacters[numPlayers]?.evil;

  const handleSelect = (characterId: CharacterId) => {
    const character = characters[characterId];
    const isSelected = selectedCharacters.includes(characterId);

    if (!character.isOptional) return;

    const atMaxGoodCharacters = character.allegiance === "good" && numActiveGoodCharacters >= maxGoodCharacters;
    const atMaxEvilCharacters = character.allegiance === "evil" && numActiveEvilCharacters >= maxEvilCharacters;

    if ((atMaxGoodCharacters || atMaxEvilCharacters) && !isSelected) {
      showToast(`You cannot have more ${character.allegiance} characters`);
      return;
    }

    void updateSession({
      selectedCharacters: isSelected
        ? selectedCharacters.filter((id) => id !== characterId)
        : [...selectedCharacters, characterId],
    });
  };

  const heading = (label: string, rightLabel?: string) => (
    <div className={styles.heading}>
      <div className={styles.headingLabel}>{label}</div>
      <div className={styles.headingAmount}>{rightLabel}</div>
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        {heading("Required Characters")}

        <SetupModule characterId="merlin" selected={selectedCharacters.includes("merlin")} onSelect={handleSelect} />
        <SetupModule
          characterId="assassin"
          selected={selectedCharacters.includes("assassin")}
          onSelect={handleSelect}
        />

        {heading("Optional Good Characters", `${numActiveGoodCharacters}/${maxGoodCharacters}`)}

        <SetupModule
          characterId="percival"
          selected={selectedCharacters.includes("percival")}
          onSelect={handleSelect}
        />

        {heading("Optional Evil Characters", `${numActiveEvilCharacters}/${maxEvilCharacters}`)}

        <SetupModule characterId="morgana" selected={selectedCharacters.includes("morgana")} onSelect={handleSelect} />
        <SetupModule characterId="mordred" selected={selectedCharacters.includes("mordred")} onSelect={handleSelect} />
        <SetupModule characterId="oberon" selected={selectedCharacters.includes("oberon")} onSelect={handleSelect} />
      </div>

      <MenuBar
        showReady={false}
        showContinue={isMyPlayerHost}
        canContinue={() => setupCanContinue(numActiveGoodCharacters, numActiveEvilCharacters)}
        onContinue={() => setupContinue(selectedCharacters)}
      />
    </>
  );
};
