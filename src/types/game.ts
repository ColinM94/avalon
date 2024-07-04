import { GameSession, Player } from "./gameSession";

export type GameState = {
  session: GameSession;
  players: Player[];
  myPlayer: Player;
  isMyPlayerHost: boolean;
  isAllReady: boolean;
  updateSession: (update: Partial<GameSession>) => void;
};
