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

  const maxEvil = maxCharacters[lobby.numPlayers].evil;
  const maxGood = maxCharacters[lobby.numPlayers].good;

  const handleContinue = async () => {
    if (!playerId) return;

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
          maxActiveCharacters={maxGood}
          updateCharacters={updateCharacters}
          headingClassName={styles.heading}
        />

        <SetupCharacters
          heading="Evil Characters"
          allegiance="evil"
          characters={characters}
          maxActiveCharacters={maxEvil}
          updateCharacters={updateCharacters}
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
