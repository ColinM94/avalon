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
  numPlayers: number;
  leaderId: string;
  players: string[];
};

export type GameSession = {
  id: string;
  name: string;
  // players: string[];
  players: Record<string, Player>;
  quests: Record<number, Quest>;
  step: "lobby" | "characterReveal" | "ritual" | "quests";
  isRitualFinished: boolean;
  numPlayers: number;
  characters: string[];
  createdBy: string;
  isHostPlaying: boolean;
  activeQuestIndex: number;
};
