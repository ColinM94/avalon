import { Player } from "types";

export interface PlayerState extends Player {
  updatePlayerStore: (update: Partial<Player>) => void;
}
