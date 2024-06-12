import * as React from "react";
import { Outlet } from "react-router-dom";

import { Splash, Toast } from "components";
import { getDocumentSnapshot, setDocument } from "services";
import { GameSession, Player } from "types";
import { usePlayerStore, useSessionStore } from "stores";
import { playerDefault, sessionDefault } from "consts";
import { MainLayout } from "layouts/mainLayout/mainLayout";
import { generateUniqueId } from "utils";

export const Root = () => {
  const { updateSessionStore } = useSessionStore();
  const { id: playerId, sessionId, updatePlayerStore } = usePlayerStore();

  console.log(playerId);

  React.useEffect(() => {
    let existingPlayerId = localStorage.getItem("playerId");

    if (!existingPlayerId) {
      existingPlayerId = generateUniqueId();
      localStorage.setItem("playerId", existingPlayerId);
    }

    const unsubscribe = getDocumentSnapshot<Player>({
      id: existingPlayerId,
      collection: "players",
      callback: (value) => {
        if (!value) {
          console.log("No player fgound");
          setDocument<Player>({
            id: existingPlayerId,
            collection: "players",
            data: {
              ...playerDefault(),
              id: existingPlayerId,
            },
          });
        }

        updatePlayerStore(value || playerDefault());
      },
    });

    return () => unsubscribe?.();
  }, [playerId, updatePlayerStore]);

  React.useEffect(() => {
    if (!sessionId) return;

    const unsubscribe = getDocumentSnapshot<GameSession>({
      id: sessionId,
      collection: "sessions",
      callback: (value) => {
        updateSessionStore(value || sessionDefault());
      },
    });

    return () => unsubscribe?.();
  }, [sessionId]);

  return (
    <MainLayout>
      <Splash />
      <Outlet />
      <Toast />
    </MainLayout>
  );
};
