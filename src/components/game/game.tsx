import { deleteField } from "firebase/firestore";

import { MainLayout } from "layouts";
import { useToastStore } from "stores";
import { User } from "types";
import { deleteDocument, updateDocument } from "services";

import { PlayPlayers } from "./components/gamePlayers/playPlayers";
import { GameRitual } from "./components/gameRitual/gameRitual";
import { GameReveal } from "./components/gameReveal/gameReveal";
import { GameLobby } from "./components/gameLobby/gameLobby";
import { GameQuests } from "./components/gameQuests/gameQuests";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Game = (props: Props) => {
  const { session, user, players, isHost } = props;

  const { showToast } = useToastStore();

  const handleLeave = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to leave? This will end the game for everyone!"
      );

      if (!confirmed) return;

      const promises = [
        updateDocument({
          id: session.id,
          collection: "sessions",
          data: {
            [`players.${user.id}`]: deleteField(),
          },
        }),
        updateDocument<User>({
          id: user.id,
          collection: "users",
          data: {
            sessionId: null,
          },
        }),
      ];

      if (isHost || session.step !== "lobby") {
        promises.push(
          deleteDocument({
            id: session.id,
            collection: "sessions",
          })
        );

        await Promise.all(promises);
      }
    } catch (error) {
      showToast(String(error));
    }
  };

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
      <MainLayout
        heading={heading()}
        showHeader
        onCloseClick={handleLeave}
        className={styles.container}
      >
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
      </MainLayout>

      <PlayPlayers
        session={session}
        players={players}
        isHost={isHost}
        className={styles.players}
      />
    </>
  );
};
