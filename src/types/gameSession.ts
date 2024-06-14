export type Player = {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  joinedAt: number;
  characterId: string;
};

export type GameSession = {
  id: string;
  name: string;
  // players: string[];
  players: Record<string, Player>;
  step: "lobby" | "characterReveal" | "ritual" | "quests";
  numPlayers: number;
  characters: string[];
  createdBy: string;
};
