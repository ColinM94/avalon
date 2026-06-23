import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { MainLayout } from "layouts/mainLayout/mainLayout";
import { Players } from "components/players/players";

import { GameSetup } from "./components/gameSetup/gameSetup";
import { GameLobby } from "./components/gameLobby/gameLobby";
import { GameReveal } from "./components/gameReveal/gameReveal";
import { GameQuestResult } from "./components/gameQuestResult/gameQuestResult";
import { GameQuestVote } from "./components/gameQuestVote/gameQuestVote";
import { GameOver } from "./components/gameOver/gameOver";
import { GameQuests } from "./components/gameQuests/gameQuests";
import { GameMemberSelectVote } from "./components/gameMemberSelectVote/gameMemberSelectVote";
import styles from "./styles.module.scss";
import { GameMemberSelect } from "./components/gameMemberSelect/gameMemberSelect";
import { GameMemberSelectResult } from "./components/gameMemberSelectResult/gameMemberSelectResult";

export const Game = () => {
  const { heading, step } = useSessionStore();

  return (
    <>
      <MainLayout heading={heading.title} className={styles.container}>
        <Players width={1} showEmptySlots={step === "lobby"} showIsReady />

        {!["lobby", "setup", "characterReveal"].includes(step) && <GameQuests className={styles.quests} />}
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
          {step === "lobby" && <GameLobby />}

          {step === "setup" && <GameSetup />}

          {step === "characterReveal" && <GameReveal />}

          {step === "memberSelect" && <GameMemberSelect />}

          {step === "memberSelectVote" && <GameMemberSelectVote />}

          {step === "memberSelectResult" && <GameMemberSelectResult />}

          {step === "questVote" && <GameQuestVote />}

          {step === "questResult" && <GameQuestResult />}

          {step === "gameOver" && <GameOver />}
        </div>
      </MainLayout>
    </>
  );
};
