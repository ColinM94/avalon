import { useNavigate } from "react-router-dom";

import { Button } from "components";
import { Characters, GameSession } from "types";
import { reactReducer } from "utils";
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
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { user } = useAppStore();

  const [tempSession, updateTempSession] = reactReducer<GameSession>({
    ...sessionDefault(),
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

      await setDocument({
        id: tempSession.id,
        collection: "sessions",
        data: tempSession,
      });

      navigate(`/lobby/${tempSession.id}`);
    } catch (error) {
      showToast(String(error));
    }
  };

  return (
    <MainLayout
      showHeader
      showBackButton
      heading="Game Setup"
      className={styles.container}
    >
      <SetupOptions
        session={tempSession}
        updateSession={updateTempSession}
        headingClassName={styles.heading}
      />

      <SetupCharacters
        heading="Good Characters"
        allegiance="good"
        characters={characters}
        maxActiveCharacters={maxGoodCharacters}
        updateCharacters={updateCharacters}
        numActiveCharacters={numActiveGoodCharacters}
        headingClassName={styles.heading}
      />

      <SetupCharacters
        heading="Evil Characters"
        allegiance="evil"
        characters={characters}
        maxActiveCharacters={maxEvilCharacters}
        updateCharacters={updateCharacters}
        numActiveCharacters={numActiveEvilCharacters}
        headingClassName={styles.heading}
      />

      <Button
        label="Continue"
        onClick={handleContinue}
        className={styles.continueButton}
      />
    </MainLayout>
  );
};
