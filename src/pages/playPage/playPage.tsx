import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAppStore } from "stores";
import { leaveSession } from "services";

import { PlayJoin } from "./components/playJoin/playJoin";
import { PlayReveal } from "./components/playReveal/playReveal";
import { PlayRitual } from "./components/playRitual/ritualPage";
import { PlayPlayers } from "./components/playPlayers/playPlayers";

import styles from "./styles.module.scss";

export const PlayPage = () => {
  const { session, user } = useAppStore();

  if (!session) return "Session not found!";

  const players = Object.values(session?.players).sort(
    (a, b) => a.joinedAt - b.joinedAt
  );

  const handleLeave = async () => {
    const confirmed = confirm(
      "Are you sure you want to leave? This will end the game for everyone!"
    );

    if (confirmed) await leaveSession(session);
  };

  const isHost = user.id === session.createdBy;

  return (
    <div className={styles.container}>
      <div onClick={handleLeave} className={styles.leaveButton}>
        <FontAwesomeIcon icon="x" className={styles.leaveButtonIcon} />
      </div>

      <div className={styles.content}>
        {session.step === "lobby" && (
          <PlayJoin
            session={session}
            players={players}
            isHost={isHost}
            user={user}
          />
        )}
        {session.step === "characterReveal" && <PlayReveal session={session} />}
        {session.step === "ritual" && <PlayRitual session={session} />}
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
