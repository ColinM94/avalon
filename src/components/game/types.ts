import { GameSession, Player, User } from "types";

export interface Props {
  session: GameSession;
  user: User;
  players: Player[];
  player: Player;
  isHost: boolean;
}
