import { useSessionStore } from "stores";
import { Player } from "types";

import { updatePlayer } from "./updatePlayer";

export const updateMyPlayer = async (update: Partial<Player>) => {
  const myPlayer = useSessionStore.getState().myPlayer;

  await updatePlayer(myPlayer.id, update);
};
