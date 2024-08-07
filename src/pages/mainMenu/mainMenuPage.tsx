import { useNavigate } from "react-router-dom";

import { MainLayout } from "layouts";
import { setDocument } from "services";
import { GameSession } from "types";
import { generateSessionId } from "utils";
import { useAppStore, useToastStore } from "stores";
import { playerDefault, sessionDefault } from "consts";

import { MainMenuButton } from "./components/mainMenuButton/mainMenuButton";
import styles from "./styles.module.scss";

export const MainMenuPage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const { showToast } = useToastStore();

  const handleCreateSession = async () => {
    try {
      const id = generateSessionId();

      const result = await setDocument<GameSession>({
        id: id,
        collection: "sessions",
        data: {
          ...sessionDefault(),
          id,
          players: {
            [user.id]: {
              ...playerDefault(),
              id: user.id,
              name: user.name || "",
              imageUrl: user.imageUrl || "",
            },
          },
          createdBy: user.id,
        },
      });

      if (!result) throw "Error creating game session";

      navigate(`/play/${id}`);
    } catch (error) {
      showToast(String(error), "error");
    }
  };

  const handleJoinLobby = () => {
    navigate(`/join`);
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
    <MainLayout className={styles.container}>
      <div className={styles.heading}>Avalon</div>

      <div className={styles.buttons}>
        <MainMenuButton
          label="Create"
          position={1}
          onClick={handleCreateSession}
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
    </MainLayout>
  );
};
