import { GameSession, Player } from "types";

export interface Props {
  session: GameSession;
  playerId: string;
  className?: string;
}
