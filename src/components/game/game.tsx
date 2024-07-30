import { MainLayout } from "layouts";
import { useSessionStore } from "stores";
import { BottomBar, Players } from "components";

import { GameLobby } from "./components/gameLobby/gameLobby";
import { GameReveal } from "./components/gameReveal/gameReveal";
import { GameRitual } from "./components/gameRitual/gameRitual";
import { GameQuestMemberSelect } from "./components/gameQuestMemberSelect/gameQuestMemberSelect";
import { GameQuestMemberVote } from "./components/gameQuestMemberVote/gameQuestMemberVote";
import { GameQuestVote } from "./components/gameQuestVote/gameQuestVote";
import { GameQuestResult } from "./components/gameQuestVoteResult/gameQuestResult";
import { GameQuestMemberResult } from "./components/gameQuestMemberResult/gameQuestMemberResult";

import styles from "./styles.module.scss";

export const Game = () => {
  const { session, players, activeQuest, heading } = useSessionStore();

  return (
    <>
      <MainLayout heading={heading.title} className={styles.container}>
        <Players
          width={1}
          showEmptySlots={session.step === "lobby"}
          showIsReady
        />

        {!["lobby", "characterReveal", "ritual"].includes(session.step) && (
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <div className={styles.infoItemHeading}>Quest</div>
              <div className={styles.infoItemValue}>
                {session.activeQuestIndex + 1}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoItemHeading}>Leader</div>
              <div className={styles.infoItemValue}>
                {players[activeQuest.leaderId]?.name}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoItemHeading}>Failed Votes</div>
              <div className={styles.infoItemValue}>
                {session.numFailVotes} / 5
              </div>
            </div>
          </div>
        )}

        <div className={styles.content}>
          {session.step === "lobby" && <GameLobby />}

          {session.step === "characterReveal" && <GameReveal />}

          {session.step === "ritual" && <GameRitual />}

          {session.step === "questMemberSelect" && <GameQuestMemberSelect />}

          {session.step === "questMemberVote" && <GameQuestMemberVote />}

          {session.step === "questMemberResult" && <GameQuestMemberResult />}

          {session.step === "questVote" && <GameQuestVote />}

          {session.step === "questResult" && <GameQuestResult />}
        </div>

        {/* <Divider /> */}

        <BottomBar />
      </MainLayout>
    </>
  );
};
