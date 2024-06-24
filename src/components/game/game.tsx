import { deleteField } from "firebase/firestore";

import { MainLayout } from "layouts";
import { useToastStore } from "stores";
import { User } from "types";
import { deleteDocument, updateDocument, updatePlayer } from "services";

import { GamePlayers } from "./components/gamePlayers/gamePlayers";
import { GameRitual } from "./components/gameRitual/gameRitual";
import { GameReveal } from "./components/gameReveal/gameReveal";
import { GameLobby } from "./components/gameLobby/gameLobby";
import { GameQuests } from "./components/gameQuests/gameQuests";

import styles from "./styles.module.scss";
import { Props } from "./types";

export const Game = ({ state }: Props) => {
  const { showToast } = useToastStore();
  // const navigate = useNavigate();

  const handleLeave = async () => {
    try {
      const confirmed = confirm(
        "Are you sure you want to leave? This will end the game for everyone!"
      );

      if (!confirmed) return;

      const promises = [
        updateDocument({
          id: state.session.id,
          collection: "sessions",
          data: {
            [`players.${state.myPlayer.id}`]: deleteField(),
          },
        }),
        updateDocument<User>({
          id: state.myPlayer.id,
          collection: "users",
          data: {
            sessionId: null,
          },
        }),
      ];

      if (state.isHost || state.session.step !== "lobby") {
        promises.push(
          deleteDocument({
            id: state.session.id,
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
    switch (state.session.step) {
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

  const setIsReady = (isReady: boolean) => {
    updatePlayer(state.myPlayer.id, state.session, {
      isReady: isReady,
    });
  };

  console.log(state.session.step);

  return (
    <>
      <MainLayout
        heading={heading()}
        showHeader
        onCloseClick={handleLeave}
        className={styles.container}
      >
        {state.session.step === "lobby" && (
          <GameLobby state={state} setIsReady={setIsReady} />
        )}

        {state.session.step === "characterReveal" && (
          <GameReveal state={state} setIsReady={setIsReady} />
        )}

        {state.session.step === "ritual" && (
          <GameRitual state={state} setIsReady={setIsReady} />
        )}

        {state.session.step === "quests" && (
          <GameQuests state={state} setIsReady={setIsReady} />
        )}
      </MainLayout>

      <GamePlayers state={state} className={styles.players} />
    </>
  );
};
