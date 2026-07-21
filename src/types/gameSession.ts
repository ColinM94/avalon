import { CharacterId } from "./general";

export type Player = {
  id: string;
  name: string;
  isMyPlayerHost: boolean;
  isReady: boolean;
  joinedAt: number;
  imageUrl?: string;
  characterId: CharacterId;
};

export type Quest = {
  index: number;
  status: "incomplete" | "fail" | "success";
  numPlayers: number;
  leaderId: string;
  players: string[];
  memberSelectVotes: Record<number, Record<string, boolean>>;
  votesToSucceed: Record<string, boolean>;
  isApproved: boolean;
  isSuccessful: boolean;
  isFailed: boolean;
};

export type GameSession = {
  id: string;
  name: string;
  // players: string[];
  players: Record<string, Player>;
  step:
    | "lobby"
    | "setup"
    | "characterReveal"
    | "ritual"
    | "memberSelect"
    | "memberSelectVote"
    | "memberSelectResult"
    | "questVote"
    | "questResult"
    | "gameOver"
    | "";
  numPlayers: number;
  characters: CharacterId[];
  createdBy: string;
  isMyPlayerHostPlaying: boolean;
  quests: Record<number, Quest>;
  activeQuestIndex: number;
  numFailMemberSelectVotes: number;
  numFailQuests: number;
  isRitualFinished: boolean;
  activeMemberSelectVoteIndex: number;
  selectedCharacters: CharacterId[];
};
