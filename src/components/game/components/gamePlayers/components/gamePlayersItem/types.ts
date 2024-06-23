import { Player } from "types";
import { GameState } from "types/game";

export interface Props {
  player: Player;
  state: GameState;
  connected: boolean;
  isHost: boolean;
  className?: string;
}
