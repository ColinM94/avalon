export type Player = {
  id: string
  name: string
  isMyPlayerHost: boolean
  isReady: boolean
  joinedAt: number
  imageUrl?: string
  characterId: string
}

export type Quest = {
  index: number
  status: "incomplete" | "fail" | "success"
  numPlayers: number
  leaderId: string
  players: string[]
  votesToApprove: Record<string, boolean>
  votesToSucceed: Record<string, boolean>
}

export type GameSession = {
  id: string
  name: string
  // players: string[];
  players: Record<string, Player>
  step:
    | "lobby"
    | "setup"
    | "characterReveal"
    | "ritual"
    | "questMemberSelect"
    | "questMemberVote"
    | "questMemberResult"
    | "questVote"
    | "questResult"
    | "gameOver"
    | ""
  numPlayers: number
  characters: string[]
  createdBy: string
  isMyPlayerHostPlaying: boolean
  quests: Record<number, Quest>
  activeQuestIndex: number
  numFailVotes: number
  numFailQuests: number
  isRitualFinished: boolean
}
