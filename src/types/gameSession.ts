export type Player = {
  id: string;
  name: string;
  joinedAt: number;
  isHost: boolean;
  isReady: boolean;
  characterId: string;
};

export type GameSession = {
  id: string;
  name: string;
  players: Record<string, Player>;
  numPlayers: number;
  characters: string[];
};
