import { GameSession, Player } from "./gameSession";

export type GameState = {
  session: GameSession;
  players: Player[];
  myPlayer: Player;
  isHost: boolean;
  isAllReady: boolean;
};
