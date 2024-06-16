import { GameSession, Player, User } from "types";

export interface Props {
  session: GameSession;
  user: User;
  className?: string;
}
