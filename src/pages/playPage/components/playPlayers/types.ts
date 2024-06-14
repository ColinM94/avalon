import { GameSession, Player } from "types";

export interface Props {
  session: GameSession;
  players: Player[];
  className?: string;
}
