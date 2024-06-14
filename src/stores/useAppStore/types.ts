import { GameSession, Player, User } from "types";

export interface AppState {
  user: User;
  player: Player;
  session: GameSession | null;

  updateUser: (update: Partial<User>) => void;
  updatePlayer: (update: Partial<Player>) => void;
  updateSession: (update: Partial<GameSession> | null) => void;
}
