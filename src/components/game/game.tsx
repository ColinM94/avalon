import { PlayPlayers } from "./components/gamePlayers/playPlayers";
import { GameRitual } from "./components/gameRitual/gameRitual";
import { GameReveal } from "./components/gameReveal/gameReveal";
import { GameLobby } from "./components/gameLobby/gameLobby";
import { GameQuests } from "./components/gameQuests/gameQuests";
import { GameHeader } from "./components/gameHeader/gameHeader";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Game = (props: Props) => {
  const { session, user, players, isHost } = props;

  return (
    <div className={styles.container}>
      <GameHeader session={session} user={user} isHost={isHost} />

      <div className={styles.content}>
        {session.step === "lobby" && (
          <GameLobby
            session={session}
            players={players}
            isHost={isHost}
            user={user}
          />
        )}

        {session.step === "characterReveal" && (
          <GameReveal
            session={session}
            players={players}
            user={user}
            isHost={isHost}
          />
        )}

        {session.step === "ritual" && (
          <GameRitual
            session={session}
            isHost={isHost}
            user={user}
            players={players}
          />
        )}

        {session.step === "quests" && (
          <GameQuests session={session} isHost={isHost} />
        )}
      </div>

      <PlayPlayers
        session={session}
        players={players}
        isHost={isHost}
        className={styles.players}
      />
    </div>
  );
};
