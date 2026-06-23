import { GameSession, Player, Quest } from "types/gameSession";

export type State = {
  // session: GameSession;
  sessionId: string;
  players: Record<string, Player>;
  myPlayer: Player;
  isMyPlayerLeader: boolean;
  isMyPlayerHost: boolean;
  isAllReady: boolean;
  activeQuest: Quest;
  playersArray: Player[];
  numPlayers: number;
  activeMemberSelectVotes: Record<string, boolean>;
  activeMemberSelectVoteIndex: number;
  numFailMemberSelectVotes: number;
  heading: {
    title: string;
    description: string;
  };
  characters: GameSession["characters"];
  step: GameSession["step"];
  numFailQuests: number;
  quests: GameSession["quests"];
  onReady?: () => string | void;
  canReady?: () => string | boolean;
  onContinue?: () => string | void;
  canContinue?: () => string | boolean;
};

export type Actions = {
  updateSessionStore: (update: Partial<State>) => void;
  resetSessionsStore: () => void;
};
