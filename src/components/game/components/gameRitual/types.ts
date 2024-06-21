import { GameSession, Player, User } from "types";

export interface Props {
  session: GameSession;
  isHost: boolean;
  players: Player[];
  myPlayer: Player;
}
