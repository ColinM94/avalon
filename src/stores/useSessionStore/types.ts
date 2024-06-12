import { Player } from "types";

export interface SessionState {
  myPlayer: Player;
  updateSessionStore: (update: Partial<SessionState>) => void;
}
