import { GameSession, Player, Quest } from "types"

export type State = {
  session: GameSession
  players: Record<string, Player>
  myPlayer: Player
  isMyPlayerLeader: boolean
  isMyPlayerHost: boolean
  isAllReady: boolean
  activeQuest: Quest
  playersArray: Player[]
  heading: {
    title: string
    description: string
  }
  onReady?: () => string | void
  canReady?: () => string | boolean
  onContinue?: () => string | void
  canContinue?: () => string | boolean
}

export type Actions = {
  updateSessionStore: (update: Partial<State>) => void
  resetSessionsStore: () => void
}
