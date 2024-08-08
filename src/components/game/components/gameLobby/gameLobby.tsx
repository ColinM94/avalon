import { useSessionStore } from "stores";
import { goToStep } from "services";
import { Player } from "types";

import { GameLobbyProfile } from "./components/gameLobbyProfile/gameLobbyProfile";
import { GameLobbyInfo } from "./components/gameLobbyInfo/gameLobbyInfo";

import styles from "./styles.module.scss";
import { MenuBar } from "components";

export const GameLobby = () => {
  const { session, playersArray, myPlayer, isAllReady, updateSessionStore } =
    useSessionStore();

  const canReady = () => {
    if (myPlayer.isReady) return "You are ready";
    if (!myPlayer.name) return "You must enter a name";
    // if (!myPlayer.imageUrl) return "You must select an image";
    return true;
  };

  const onReady = () => {
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
  };

  const canContinue = () => {
    if (playersArray.length < 5) {
      return "There has to be at least 5 players to start";
    }

    if (!isAllReady) {
      return "All players are not ready";
    }

    return true;
  };

  const onContinue = () => {
    const playerUpdates: Record<string, Partial<Player>> = {};

    playersArray.forEach((player, index) => {
      playerUpdates[player.id] = {
        characterId: session.characters[index],
      };
    });

    goToStep({
      step: "setup",
      playerUpdates,
    });
  };

  return (
    <>
      <GameLobbyInfo className={styles.info} />
      <GameLobbyProfile className={styles.profile} />

      <MenuBar
        canContinue={canContinue}
        canReady={canReady}
        onReady={onReady}
        onContinue={onContinue}
      />
    </>
  );
};
