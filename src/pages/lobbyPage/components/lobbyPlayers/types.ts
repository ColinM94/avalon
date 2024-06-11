import { GameSession, Player } from "types";

export interface Props {
  players: Player[];
  session: GameSession;
  playerId: string;
  className?: string;
}
