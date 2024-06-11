import { useNavigate } from "react-router-dom";

import { Button, Header } from "components";
import { Characters, GameSession } from "types";
import { generateLobbyCode, reactReducer, shuffleArray } from "utils";
import { charactersDefault, maxCharacters } from "consts";
import { setDocument } from "services";

import { SetupCharacters } from "./components/setupCharacters/setupCharacters";
import { SetupOptions } from "./components/setupOptions/setupOptions";
import styles from "./styles.module.scss";

export const SetupPage = () => {
  const navigate = useNavigate();

  const playerId = localStorage.getItem("playerId");

  const [session, updateSession] = reactReducer<GameSession>({
    id: "",
    name: "",
    players: {},
    numPlayers: 5,
    characters: [],
  });

  const [characters, updateCharacters] =
    reactReducer<Characters>(charactersDefault);

  const numActiveGoodCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "good" && character.isActive
  ).length;

  const numActiveEvilCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "evil" && character.isActive
  ).length;

  const maxGoodCharacters = maxCharacters[session.numPlayers].good;
  const maxEvilCharacters = maxCharacters[session.numPlayers].evil;

  const handleContinue = async () => {
    if (!playerId) return;

    try {
      if (!session.name) {
        throw "Please enter a name";
      }

      if (numActiveGoodCharacters < maxGoodCharacters) {
        const numRemaining = maxGoodCharacters - numActiveGoodCharacters;
        throw `Please select ${numRemaining} more Good character${
          numRemaining === 1 ? "" : "s"
        }!`;
      }

      if (numActiveEvilCharacters < maxEvilCharacters) {
        const numRemaining = maxEvilCharacters - numActiveEvilCharacters;

        throw `Please select ${numRemaining} more Evil character${
          numRemaining === 1 ? "" : "s"
        }!`;
      }

      const shuffledCharacters = shuffleArray(
        Object.values(characters)
          .filter((character) => character.isActive)
          .map((character) => character.id)
      );

      const sessionCode = generateLobbyCode();

      await setDocument<GameSession>({
        id: sessionCode,
        collection: "sessions",
        data: {
          ...session,
          players: {
            [playerId]: {
              id: playerId,
              isHost: true,
              joinedAt: Date.now(),
              name: "Host",
              isReady: false,
              characterId: "",
            },
          },
          characters: shuffledCharacters,
        },
      });

      navigate(`/lobby/${sessionCode}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Header heading="Avalon Setup" />

      <div className={styles.container}>
        <SetupOptions
          session={session}
          updateSession={updateSession}
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
      </div>
    </>
  );
};
