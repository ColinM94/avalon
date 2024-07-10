import { useSessionStore } from "stores";
import { GameSession, Player } from "types";

import { updateSession } from "./updateSession";
import { updatePlayer } from "./updatePlayer";

interface Props {
  step: GameSession["step"];
  characterIds?: string[];
}

export const goToStep = async ({ step, characterIds }: Props) => {
  const { playersArray } = useSessionStore.getState();

  const promises: Promise<void>[] = [];

  playersArray.forEach((player, index) => {
    const update: Partial<Player> = {
      isReady: false,
    };

    if (characterIds) {
      update.characterId = characterIds[index];
    }

    promises.push(updatePlayer(player.id, update));
  });

  await Promise.all(promises);

  updateSession({
    step,
  });
};
