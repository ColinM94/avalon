import { GameSession, Player, User } from "types";

export interface Props {
  session: GameSession;
  isHost: boolean;
  user: User;
  players: Player[];
}
