import { useNavigate } from "react-router-dom";

import { Button, Header } from "components";
import { Characters, Lobby } from "types";
import { generateLobbyCode, reactReducer } from "utils";
import { charactersDefault, maxCharacters } from "consts";
import { setDocument } from "services";

import { SetupCharacters } from "./components/setupCharacters/setupCharacters";
import { SetupOptions } from "./components/setupOptions/setupOptions";
import styles from "./styles.module.scss";

export const SetupPage = () => {
  const navigate = useNavigate();

  const playerId = localStorage.getItem("playerId");

  const [lobby, updateLobby] = reactReducer<Lobby>({
    id: "",
    name: "",
    players: {},
    numPlayers: 5,
  });

  const [characters, updateCharacters] =
    reactReducer<Characters>(charactersDefault);

  const numActiveGoodCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "good" && character.isActive
  ).length;

  const numActiveEvilCharacters = Object.values(characters).filter(
    (character) => character.allegiance === "evil" && character.isActive
  ).length;

  const maxGoodCharacters = maxCharacters[lobby.numPlayers].good;
  const maxEvilCharacters = maxCharacters[lobby.numPlayers].evil;

  const handleContinue = async () => {
    if (!playerId) return;

    try {
      if (!lobby.name) {
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

      const lobbyCode = generateLobbyCode();

      await setDocument<Lobby>({
        id: lobbyCode,
        collection: "lobbies",
        data: {
          ...lobby,
          players: {
            [playerId]: {
              id: playerId,
              isHost: true,
              joinedAt: Date.now(),
              name: "Host",
              isReady: false,
            },
          },
        },
      });

      navigate(`/lobby/${lobbyCode}`);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Header heading="Avalon Setup" />

      <div className={styles.container}>
        <SetupOptions
          lobby={lobby}
          updateLobby={updateLobby}
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
