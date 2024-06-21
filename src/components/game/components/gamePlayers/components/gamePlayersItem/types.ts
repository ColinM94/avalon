import { GameSession, Player, User } from "types";

export interface Props {
  player: Player;
  myPlayer: Player;
  session: GameSession;
  connected: boolean;
  isHost: boolean;
  className?: string;
}
