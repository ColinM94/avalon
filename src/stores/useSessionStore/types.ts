import { GameSession, Player, Quest } from "types";

export type State = {
  session: GameSession;
  players: Record<string, Player>;
  myPlayer: Player;
  isMyPlayerLeader: boolean;
  isMyPlayerHost: boolean;
  isAllReady: boolean;
  activeQuest: Quest;
  heading: {
    title?: string;
    subtitle?: string;
  };
  playersArray: Player[];
};

export type Actions = {
  updateSessionStore: (update: Partial<State>) => void;
  resetSessionsStore: () => void;
};
