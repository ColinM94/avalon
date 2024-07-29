import { useSessionStore } from "stores";
import { GameSession, Player } from "types";

import { updateSession } from "./updateSession";
import { updatePlayer } from "./updatePlayer";

interface Props {
  step: GameSession["step"];
  playerUpdates?: Record<string, Partial<Player>>;
}

export const goToStep = async ({ step, playerUpdates }: Props) => {
  const { playersArray } = useSessionStore.getState();

  const promises: Promise<void>[] = [];

  playersArray.forEach((player) => {
    const update: Partial<Player> = {
      ...(playerUpdates && { ...playerUpdates[player.id] }),
      isReady: false,
    };

    promises.push(updatePlayer(player.id, update));
  });

  await Promise.all(promises);

  updateSession({
    step,
  });
};
