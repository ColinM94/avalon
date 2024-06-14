import * as React from "react";
import { useParams } from "react-router-dom";

import { joinSession, updateMyPlayer, updateSession } from "services";
import { Button } from "components";
import { useAppStore } from "stores";
import { SessionLayout } from "layouts";
import { shuffleArray } from "utils";

import { LobbyPlayers } from "./components/lobbyPlayers/lobbyPlayers";
import { LobbyJoin } from "./components/lobbyJoin/lobbyJoin";

import styles from "./styles.module.scss";

export const LobbyPage = () => {
  const { code: sessionId } = useParams();
  const { session, user } = useAppStore();

  React.useEffect(() => {
    if (sessionId && !session?.players[user.id]) joinSession(sessionId);
  }, []);

  const myPlayer = session?.players[user?.id];

  const handleReady = async () => {
    if (!sessionId) return;

    updateMyPlayer({
      isReady: true,
    });
  };

  React.useEffect(() => {
    if (
      !session.players ||
      !session?.characters ||
      !user ||
      session.createdBy !== user.id
    ) {
      return;
    }

    const shuffledCharacters = shuffleArray(session.characters);

    const players = Object.values(session.players);

    if (players.every((player) => player.isReady)) {
      const tempPlayers = session.players;

      players.forEach((player, index) => {
        tempPlayers[player.id].characterId = shuffledCharacters[index];
      });

      updateSession({
        step: "characterReveal",
        characters: shuffledCharacters,
        players: tempPlayers,
      });
    }
  }, [session?.players]);

  return (
    <SessionLayout className={styles.container}>
      <LobbyJoin sessionId={session.id} className={styles.join} />

      <div className={styles.divider} />

      <LobbyPlayers
        session={session}
        userId={user.id}
        className={styles.players}
      />

      <div className={styles.buttons}>
        <Button
          label="Ready"
          disabled={myPlayer.isReady}
          onClick={handleReady}
          className={styles.readyButton}
        />
      </div>
    </SessionLayout>
  );
};
