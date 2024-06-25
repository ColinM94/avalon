import { Player } from "types";

export interface State {
  sessionId: string;
  players: Record<string, Player>;
  myPlayer: Player;
  isHost: boolean;
  isAllReady: boolean;
}

export type Actions = {
  updateSessionStore: (update: Partial<State>) => void;
};
