import * as React from "react";

import { useSessionStore } from "stores";
import { goToStep } from "services";
import { Player } from "types";

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

    const playerUpdates: Record<string, Partial<Player>> = {};

    playersArray.forEach((player, index) => {
      playerUpdates[player.id] = {
        characterId: session.characters[index],
      };
    });

    goToStep({
      step: "characterReveal",
      playerUpdates,
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
  }, [myPlayer.name]);

  return (
    <>
      <GameLobbyInfo className={styles.info} />
      <GameLobbyProfile className={styles.profile} />
    </>
  );
};
