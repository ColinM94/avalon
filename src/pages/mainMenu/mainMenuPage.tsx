import { useNavigate } from "react-router-dom";
import { MainMenuButton } from "./components/mainMenuButton/mainMenuButton";

import styles from "./styles.module.scss";

export const MainMenuPage = () => {
  const navigate = useNavigate();

  const handleCreateLobby = () => {
    navigate("/setup");
  };

  const handleJoinLobby = () => {
    // if (!lobbyCode) {
    //   alert("Please enter a lobby code");
    //   return;
    // }
    // navigate(`/lobby/${lobbyCode}`);
  };

  const handleRules = () => {
    window
      .open(
        "https://fgbradleys.com/wp-content/uploads/Avalon-Big-Box-Rulebook.pdf",
        "_blank"
      )
      ?.focus();
  };

  const handleCharacters = () => {
    navigate("/characters");
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>Avalon</div>

      <div className={styles.buttons}>
        <MainMenuButton
          label="Create"
          position={1}
          onClick={handleCreateLobby}
          className={styles.button}
        />

        <MainMenuButton
          label="Join"
          position={2}
          onClick={handleJoinLobby}
          className={styles.button}
        />

        <MainMenuButton
          label="Rules"
          position={3}
          onClick={handleRules}
          className={styles.button}
        />

        <MainMenuButton
          label="Characters"
          position={4}
          onClick={handleCharacters}
          className={styles.button}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.createdBy}>Created by Colin Maher</div>
      </div>
    </div>
  );
};
