import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { Characters, GameSession } from "types";
import {
  generateLobbyCode,
  getQuestNumPlayers,
  reactReducer,
  shuffleArray,
} from "utils";
import {
  charactersDefault,
  maxCharacters,
  playerDefault,
  sessionDefault,
} from "consts";
import { useAppStore, useToastStore } from "stores";
import { MainLayout } from "layouts";
import { setDocument } from "services";

import { SetupCharacters } from "./components/setupCharacters/setupCharacters";
import { SetupOptions } from "./components/setupOptions/setupOptions";

import styles from "./styles.module.scss";

export const SetupPage = () => {
  const { showToast } = useToastStore();
  const { user } = useAppStore();
  const navigate = useNavigate();

  const [tempSession, updateTempSession] = reactReducer<GameSession>({
    ...sessionDefault(),
    id: generateLobbyCode(),
    players: {
      [user.id]: {
        ...playerDefault(),
        id: user.id,
        name: user.name,
        joinedAt: Date.now(),
        isHost: true,
      },
    },
    createdBy: user.id,
  });

  const [characters, updateCharacters] =
    reactReducer<Characters>(charactersDefault);

  const numActiveGoodCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "good" && character.isActive
  ).length;

  const numActiveEvilCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "evil" && character.isActive
  ).length;

  const maxGoodCharacters = maxCharacters[tempSession.numPlayers]?.good;
  const maxEvilCharacters = maxCharacters[tempSession.numPlayers]?.evil;

  const handleContinue = async () => {
    if (!user.id) return;

    try {
      // if (!session.name) {
      //   throw "Please enter a name";
      // }

      if (numActiveGoodCharacters !== maxGoodCharacters) {
        const numRemaining = maxGoodCharacters - numActiveGoodCharacters;

        if (Math.sign(numRemaining) === 1) {
          throw `Please select ${numRemaining} more Good character${
            numRemaining === 1 ? "" : "s"
          }!`;
        } else {
          throw `You have selected too many Good character${
            numRemaining === 1 ? "" : "s"
          }!`;
        }
      }

      if (numActiveEvilCharacters !== maxEvilCharacters) {
        const numRemaining = maxEvilCharacters - numActiveEvilCharacters;

        if (Math.sign(numRemaining) === 1) {
          throw `Please select ${numRemaining} more Evil character${
            numRemaining === 1 ? "" : "s"
          }!`;
        } else {
          throw `You have selected too many Evil character${
            numRemaining === 1 ? "" : "s"
          }!`;
        }
      }

      const shuffledCharacters = shuffleArray(
        Object.values(characters)
          .filter((character) => character.isActive)
          .map((character) => character.id)
      );

      for (let i = 0; i < 5; i++) {
        tempSession.quests[i] = {
          ...tempSession.quests[i],
          numPlayers: getQuestNumPlayers(i, tempSession.numPlayers),
        };
      }

      await setDocument({
        id: tempSession.id,
        collection: "sessions",
        data: {
          ...tempSession,
          characters: shuffledCharacters,
        },
      });

      console.log("navigating to ", tempSession.id);

      navigate(`/play/${tempSession.id}`);
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  return (
    <MainLayout
      showHeader
      showBackButton
      heading="Game Setup"
      className={styles.container}
    >
      <SetupOptions session={tempSession} updateSession={updateTempSession} />

      <SetupCharacters
        heading="Good Characters"
        allegiance="good"
        characters={characters}
        maxActiveCharacters={maxGoodCharacters}
        updateCharacters={updateCharacters}
        numActiveCharacters={numActiveGoodCharacters}
      />

      <SetupCharacters
        heading="Evil Characters"
        allegiance="evil"
        characters={characters}
        maxActiveCharacters={maxEvilCharacters}
        updateCharacters={updateCharacters}
        numActiveCharacters={numActiveEvilCharacters}
      />

      <Button
        label="Continue"
        onClick={handleContinue}
        className={styles.continueButton}
      />
    </MainLayout>
  );
};
