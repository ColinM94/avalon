import { PlayPlayers } from "./components/gamePlayers/playPlayers";
import { GameLeaveButton } from "./components/gameLeaveButton/gameLeaveButton";
import { GameJoin } from "./components/gameJoin/gameJoin";
import { GameRitual } from "./components/gameRitual/gameRitual";
import { GameReveal } from "./components/gameReveal/gameReveal";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Game = (props: Props) => {
  const { session, user, players, isHost } = props;

  return (
    <div className={styles.container}>
      <GameLeaveButton session={session} user={user} />

      <div className={styles.content}>
        {session.step === "lobby" && (
          <GameJoin
            session={session}
            players={players}
            isHost={isHost}
            user={user}
          />
        )}
        {session.step === "characterReveal" && <GameReveal session={session} />}
        {session.step === "ritual" && <GameRitual session={session} />}
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
