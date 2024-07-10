import { useSessionStore } from "stores";
import { GameSession } from "types";

import { updateSession } from "./updateSession";
import { updatePlayer } from "./updatePlayer";

export const goToStep = async (step: GameSession["step"]) => {
  const { playersArray } = useSessionStore.getState();

  const promises = [];

  for (const player of playersArray) {
    promises.push(
      updatePlayer(player.id, {
        isReady: false,
      })
    );
  }

  await Promise.all(promises);

  updateSession({
    step,
  });
};
