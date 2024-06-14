import { Player } from "types";

export interface Props {
  player: Player;
  isHost: boolean;
  connected: boolean;
  className?: string;
}
