import * as React from "react";
import { Outlet } from "react-router-dom";

import { Splash, Toast } from "components";
import {
  getDocumentSnapshot,
  getDocumentsSnapshot,
  setDocument,
} from "services";
import { GameSession, Player } from "types";
import { useAppStore } from "stores";
import { playerDefault, sessionDefault } from "consts";
import { generateUniqueId } from "utils";
import { MainLayout } from "layouts/mainLayout/mainLayout";

export const Root = () => {
  const { player, updatePlayer, updateSession } = useAppStore();

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
          setDocument<Player>({
            id: existingPlayerId,
            collection: "players",
            data: {
              ...playerDefault(),
              id: existingPlayerId,
            },
          });
        }

        updatePlayer(value || playerDefault());
      },
    });

    return () => unsubscribe?.();
  }, [player.id, updatePlayer]);

  React.useEffect(() => {
    const unsubscribe = getDocumentsSnapshot<GameSession>({
      collection: "sessions",
      where: [["players", "array-contains", player.id]],
      callback: (sessions) => {
        console.log(sessions);
        updateSession(sessions[0] || null);
      },
    });

    return () => unsubscribe?.();
  }, [player.id, player.sessionId, updateSession]);

  return (
    <MainLayout>
      <Splash />
      <Outlet />
      <Toast />
    </MainLayout>
  );
};
