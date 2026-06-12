import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { MainLayout } from "layouts/mainLayout/mainLayout";
import { Players } from "components/players/players";

import { GameSetup } from "./components/gameSetup/gameSetup";
import { GameLobby } from "./components/gameLobby/gameLobby";
import { GameReveal } from "./components/gameReveal/gameReveal";
import { GameQuestMemberResult } from "./components/gameQuestMemberResult/gameQuestMemberResult";
import { GameQuestMemberSelect } from "./components/gameQuestMemberSelect/gameQuestMemberSelect";
import { GameQuestMemberVote } from "./components/gameQuestMemberVote/gameQuestMemberVote";
import { GameQuestResult } from "./components/gameQuestResult/gameQuestResult";
import { GameQuestVote } from "./components/gameQuestVote/gameQuestVote";
import { GameOver } from "./components/gameOver/gameOver";
import { GameQuests } from "./components/gameQuests/gameQuests";
import styles from "./styles.module.scss";

export const Game = () => {
  const { session, heading, players, activeQuest } = useSessionStore();

  return (
    <>
      <MainLayout heading={heading.title} className={styles.container}>
        <Players width={1} showEmptySlots={session.step === "lobby"} showIsReady />

        {!["lobby", "setup", "characterReveal"].includes(session.step) && <GameQuests className={styles.quests} />}
        {/* 
        {!["setup", "lobby", "characterReveal", "ritual"].includes(session.step) && (
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <div className={styles.infoItemHeading}>Quest</div>
              <div className={styles.infoItemValue}>{activeQuest.index + 1}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoItemHeading}>Leader</div>
              <div className={styles.infoItemValue}>{players[activeQuest.leaderId]?.name}</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoItemHeading}>Failed Votes</div>
              <div className={styles.infoItemValue}>{session.numFailVotes} / 5</div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoItemHeading}>Failed Quests</div>
              <div className={styles.infoItemValue}>{session.numFailQuests} / 3</div>
            </div>
          </div>
        )} */}

        <div className={styles.content}>
          {session.step === "lobby" && <GameLobby />}

          {session.step === "setup" && <GameSetup />}

          {session.step === "characterReveal" && <GameReveal />}

          {session.step === "questMemberSelect" && <GameQuestMemberSelect />}

          {session.step === "questMemberVote" && <GameQuestMemberVote />}

          {session.step === "questMemberResult" && <GameQuestMemberResult />}

          {session.step === "questVote" && <GameQuestVote />}

          {session.step === "questResult" && <GameQuestResult />}

          {session.step === "gameOver" && <GameOver />}
        </div>
      </MainLayout>
    </>
  );
};
