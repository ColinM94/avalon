import { MainLayout } from "layouts";
import { useSessionStore } from "stores";

import { GamePlayers } from "./components/gamePlayers/gamePlayers";
import { GameLobby } from "./components/gameLobby/gameLobby";
import { GameReveal } from "./components/gameReveal/gameReveal";
import { GameRitual } from "./components/gameRitual/gameRitual";
import { GameQuests } from "./components/gameQuests/gameQuests";

import styles from "./styles.module.scss";

export const Game = () => {
  const { session } = useSessionStore();

  console.log(session);

  // const navigate = useNavigate();

  const heading = () => {
    switch (session.step) {
      case "lobby":
        return "Lobby";
      case "characterReveal":
        return "Character Reveal";
      case "ritual":
        return "Ritual";
      case "quests":
        return "Quests";
    }
  };

  return (
    <>
      <MainLayout heading={heading()} showHeader className={styles.container}>
        {session.step === "lobby" && <GameLobby />}

        {session.step === "characterReveal" && <GameReveal />}

        {session.step === "ritual" && <GameRitual />}

        {session.step === "quests" && <GameQuests />}
      </MainLayout>

      <GamePlayers className={styles.players} />
    </>
  );
};
