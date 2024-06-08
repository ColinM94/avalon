import * as React from "react";

import { useNavigate } from "react-router-dom";
import { Button, CharacterCard, Header, InputText } from "components";

import styles from "./styles.module.scss";
import { charactersDefault } from "consts";

export const HomePage = () => {
  const navigate = useNavigate();

  const [lobbyCode, setLobbyCode] = React.useState("");

  const handleCreateLobby = () => {
    navigate("/setup");
  };

  const handleJoinLobby = () => {
    if (!lobbyCode) {
      alert("Please enter a lobby code");
      return;
    }

    navigate("/lobby");
  };

  const handleRulesClick = () => {};

  return (
    <div className={styles.container}>
      <Header heading="Avalon" hideBackButton />

      <div className={styles.section}>
        <div className={styles.sectionHeading}>Create a Lobby</div>

        <Button label="Create" onClick={handleCreateLobby} />
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionHeading}>Join a Lobby</div>

        <InputText
          value={lobbyCode}
          setValue={setLobbyCode}
          placeholder="Lobby Code"
          className={styles.lobbyInput}
        />

        <Button label="Join" onClick={handleJoinLobby} />
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <div className={styles.sectionHeading}>Info</div>

        <Button label="Characters" onClick={handleJoinLobby} />

        <div className={styles.characters}>
          {Object.values(charactersDefault).map((character) => (
            <CharacterCard
              character={character}
              alwaysActive
              showName={false}
              onClick={() => {}}
              className={styles.character}
            />
          ))}
        </div>
        <Button label="Rules" onClick={handleJoinLobby} />
      </div>

      {/* <div className={styles.footer}>
        <a
          target="_blank"
          href="https://fgbradleys.com/wp-content/uploads/Avalon-Big-Box-Rulebook.pdf"
          className={styles.rulesLink}
        >
          Game Rules
        </a>

        <div className={styles.createdBy}>Created by Colin Maher</div>
      </div> */}
    </div>
  );
};
