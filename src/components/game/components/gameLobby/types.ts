import { GameSession, Player, User } from "types";

export interface Props {
  session: GameSession;
  players: Player[];
  player: Player;
  isHost: boolean;
  setIsReady: () => void;
  className?: string;
}
