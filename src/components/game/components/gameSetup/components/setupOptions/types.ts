import { GameSession } from "types/gameSession"

export interface Props {
  session: GameSession
  updateSession: (update: Partial<GameSession>) => void
}
