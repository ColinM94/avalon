import { MainLayout } from "layouts";
import { useSessionStore } from "stores";

import { GamePlayers } from "./components/gamePlayers/gamePlayers";
import { GameLobby } from "./components/gameLobby/gameLobby";
import { GameReveal } from "./components/gameReveal/gameReveal";
import { GameRitual } from "./components/gameRitual/gameRitual";
import { GameQuests } from "./components/gameQuests/gameQuests";
import { QuestMemberSelect } from "./components/questMemberSelect/questMemberSelect";
import { QuestMemberApproval } from "./components/questMemberApproval/questMemberApproval";

import styles from "./styles.module.scss";

export const Game = () => {
  const { session, heading } = useSessionStore();

  // const heading = () => {
  //   switch (session.step) {
  //     case "lobby":
  //       return "Lobby";
  //     case "characterReveal":
  //       return "Character Reveal";
  //     case "ritual":
  //       return "Ritual";
  //     case "questMemberSelect":
  //       return "Quest Preparation";
  //     case "questApproval":
  //       return "Vote to Approve";
  //     case "quest":
  //       return "Quest";
  //   }
  // };

  return (
    <>
      <MainLayout
        heading={heading.title}
        showHeader
        className={styles.container}
      >
        {heading.subtitle && (
          <div className={styles.subtitle}>{heading.subtitle}</div>
        )}

        {session.step === "lobby" && <GameLobby />}

        {session.step === "characterReveal" && <GameReveal />}

        {session.step === "ritual" && <GameRitual />}

        {session.step === "questMemberSelect" && <QuestMemberSelect />}

        {session.step === "questApproval" && <QuestMemberApproval />}

        {session.step === "quest" && <GameQuests />}
      </MainLayout>

      <GamePlayers className={styles.players} />
    </>
  );
};
