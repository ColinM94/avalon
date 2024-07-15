import * as React from "react";

import { useSessionStore } from "stores";
import { goToStep } from "services";

import { GameLobbyProfile } from "./components/gameLobbyProfile/gameLobbyProfile";
import { GameLobbyInfo } from "./components/gameLobbyInfo/gameLobbyInfo";

import styles from "./styles.module.scss";

export const GameLobby = () => {
  const {
    session,
    isAllReady,
    isMyPlayerHost,
    playersArray,
    myPlayer,
    updateSessionStore,
  } = useSessionStore();

  React.useEffect(() => {
    if (!isMyPlayerHost || !isAllReady) return;

    goToStep({
      step: "characterReveal",
      characterIds: session.characters,
    });
  }, [isAllReady]);

  const validate = () => {
    if (!myPlayer.name) return "You must enter a name";

    const filteredPlayers = playersArray.filter(
      (player) => player.id !== myPlayer.id
    );

    if (
      filteredPlayers.some(
        (player) =>
          player.name.toLocaleLowerCase() === myPlayer.name.toLocaleLowerCase()
      )
    ) {
      return "This name is taken";
    }

    return true;
  };

  React.useEffect(() => {
    updateSessionStore({ validateReady: validate });
  }, []);

  return (
    <>
      <GameLobbyInfo className={styles.info} />
      <GameLobbyProfile className={styles.profile} />
    </>
  );
};
