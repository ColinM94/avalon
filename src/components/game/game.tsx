import { MainLayout } from "layouts";
import { useSessionStore } from "stores";

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
  const { session, heading } = useSessionStore();

  return (
    <>
      <MainLayout
        heading={heading.title}
        // showHeader
        className={styles.container}
      >
        {heading.subtitle && (
          <div className={styles.subtitle}>{heading.subtitle}</div>
        )}

        {session.step === "lobby" && <GameLobby />}

        {session.step === "characterReveal" && <GameReveal />}

        {session.step === "ritual" && <GameRitual />}

        {session.step === "questMemberSelect" && <GameQuestMemberSelect />}

        {session.step === "questMemberVote" && <GameQuestMemberVote />}

        {session.step === "questMemberResult" && <GameQuestMemberResult />}

        {session.step === "questVote" && <GameQuestVote />}

        {session.step === "questResult" && <GameQuestResult />}
      </MainLayout>
    </>
  );
};
