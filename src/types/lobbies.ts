export type Player = {
  id: string;
  name: string;
};

export type Lobby = {
  id: string;
  name: string;
  players: Record<string, Player>;
  numPlayers: number;
};
