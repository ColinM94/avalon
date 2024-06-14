import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { joinSession, updateMyPlayer, updateSession } from "services";
import { Button } from "components";
import { useAppStore, useToastStore } from "stores";
import { MainLayout } from "layouts";

import { LobbyPlayers } from "./components/lobbyPlayers/lobbyPlayers";
import { LobbyJoin } from "./components/lobbyJoin/lobbyJoin";

import styles from "./styles.module.scss";
import { shuffleArray } from "utils";
import { charactersDefault } from "consts";

export const LobbyPage = () => {
  const { code: sessionId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToastStore();
  const { session, user } = useAppStore();

  if (session === null) {
    showToast("Game not found!");
    navigate("/");
  }

  const myPlayer = session.players[user.id];
  const players = Object.values(session.players);

  React.useEffect(() => {
    joinSession(session.id);
  }, []);

  const handleReady = async () => {
    if (!sessionId) return;

    updateMyPlayer({
      isReady: true,
    });
  };

  React.useEffect(() => {
    if (session.createdBy !== user.id) return;

    const shuffledCharacters = shuffleArray(
      Object.values(charactersDefault)
        .filter((character) => character.isActive)
        .map((character) => character.id)
    );

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
  }, []);

  return (
    <MainLayout showHeader showLeaveButton className={styles.container}>
      <LobbyJoin sessionId={session.id} className={styles.join} />

      <div className={styles.divider} />

      <LobbyPlayers
        session={session}
        playerId={user.id}
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
    </MainLayout>
  );
};
