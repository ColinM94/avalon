import { GameSession, Player, User } from "types";

export interface Props {
  session: GameSession;
  players: Player[];
  isHost: boolean;
  user: User;
  className?: string;
}
