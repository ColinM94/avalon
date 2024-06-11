import { GameSession } from "types";

export interface Props {
  session: GameSession;
  updateSession: (update: Partial<GameSession>) => void;
  headingClassName?: string;
}
