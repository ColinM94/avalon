import * as React from "react";
import { Outlet } from "react-router-dom";

import { Splash, Toast } from "components";
import { getDocumentSnapshot, setDocument } from "services";
import { GameSession, Player } from "types";
import { useAppStore } from "stores";
import { playerDefault, sessionDefault } from "consts";
import { MainLayout } from "layouts/mainLayout/mainLayout";
import { generateUniqueId } from "utils";

export const Root = () => {
  const { player, session, updatePlayer, updateSession } = useAppStore();

  console.log(player, session);

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

        updatePlayer(value || playerDefault());
      },
    });

    return () => unsubscribe?.();
  }, [player.id, updatePlayer]);

  React.useEffect(() => {
    if (!player.sessionId) return;

    const unsubscribe = getDocumentSnapshot<GameSession>({
      id: player.sessionId,
      collection: "sessions",
      callback: (value) => {
        updateSession(value || sessionDefault());
      },
    });

    return () => unsubscribe?.();
  }, [player.sessionId, updateSession]);

  return (
    <MainLayout>
      <Splash />
      <Outlet />
      <Toast />
    </MainLayout>
  );
};
