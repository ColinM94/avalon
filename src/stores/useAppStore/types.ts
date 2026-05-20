import { User } from "types/user"

export type State = {
  user: User
}

export type Actions = {
  updateAppStore: (update: Partial<State>) => void
}
