import { useSessionStore } from "stores/useSessionStore/useSessionStore";

import { GameLobbyProfile } from "./components/gameLobbyProfile/gameLobbyProfile";
import { GameLobbyInfo } from "./components/gameLobbyInfo/gameLobbyInfo";
import { MenuBar } from "components/menuBar/menuBar";
import { lobbyCanContinue, lobbyCanReady, lobbyContinue } from "services/session/logic";

import styles from "./styles.module.scss";

export const GameLobby = () => {
  const { myPlayer } = useSessionStore();

  return (
    <>
      <GameLobbyInfo className={styles.info} />

      <GameLobbyProfile className={styles.profile} />

      <MenuBar
        canContinue={lobbyCanContinue}
        onContinue={lobbyContinue}
        canReady={() => lobbyCanReady(myPlayer, myPlayer.name)}
      />
    </>
  );
};
