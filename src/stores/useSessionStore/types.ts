import { GameSession } from "types";

export interface SessionState extends GameSession {
  updateSessionStore: (update: Partial<SessionState>) => void;
}
