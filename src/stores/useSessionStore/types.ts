import { GameSession, Player, Quest } from "types";

export type State = {
  session: GameSession;
  players: Record<string, Player>;
  myPlayer: Player;
  isHost: boolean;
  isAllReady: boolean;
  activeQuest: Quest | null;
  playersArray: Player[];
};

export type Actions = {
  updateSessionStore: (update: Partial<State>) => void;
  resetSessionsStore: () => void;
};
