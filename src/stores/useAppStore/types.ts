import { GameSession, Player } from "types";

export interface AppState {
  player: Player;
  session: GameSession;

  updatePlayer: (update: Partial<Player>) => void;
  updateSession: (update: Partial<GameSession>) => void;
}
