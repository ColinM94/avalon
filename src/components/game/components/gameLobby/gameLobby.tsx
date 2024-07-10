import * as React from "react";

import { useSessionStore } from "stores";
import { goToStep } from "services";

import { GameLobbyProfile } from "./components/gameLobbyProfile/gameLobbyProfile";
import { GameLobbyInfo } from "./components/gameLobbyInfo/gameLobbyInfo";

import styles from "./styles.module.scss";

export const GameLobby = () => {
  const { session, isAllReady, isMyPlayerHost } = useSessionStore();

  React.useEffect(() => {
    if (!isMyPlayerHost || !isAllReady) return;

    goToStep({
      step: "characterReveal",
      characterIds: session.characters,
    });
  }, [isAllReady]);

  return (
    <>
      <GameLobbyInfo className={styles.info} />
      <GameLobbyProfile className={styles.profile} />
    </>
  );
};
