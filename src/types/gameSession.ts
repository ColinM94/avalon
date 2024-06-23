export type Player = {
  id: string;
  name: string;
  isHost: boolean;
  isReady: boolean;
  joinedAt: number;
  characterId: string;
};

export type Quest = {
  index: number;
  status: "incomplete" | "fail" | "success";
};

export type GameSession = {
  id: string;
  name: string;
  // players: string[];
  players: Record<string, Player>;
  quest1: Quest;
  quest2: Quest;
  quest3: Quest;
  quest4: Quest;
  quest5: Quest;
  step: "lobby" | "characterReveal" | "ritual" | "quests";
  isRitualFinished: boolean;
  numPlayers: number;
  characters: string[];
  createdBy: string;
};
