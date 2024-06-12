export type Player = {
  id: string;
  name: string;
  sessionId: string;
  isHost: boolean;
  isReady: boolean;
  joinedAt: number;
  characterId: string;
};

export type GameSession = {
  id: string;
  name: string;
  players: Record<string, Player>;
  numPlayers: number;
  createdBy: string;
};
