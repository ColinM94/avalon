import { GameSession, Player } from "types";

export interface Props {
  session: GameSession;
  player: Player;
  connected: boolean;
  isHost: boolean;
  className?: string;
}
