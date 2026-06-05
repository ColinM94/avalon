import { Toast } from "types/toast"
import { User } from "types/user"

export type State = {
  user: User
  toast: Toast | null
}

export type Actions = {
  updateAppStore: (update: Partial<State>) => void
  showToast: (text: string, type?: Toast["type"]) => void
  deleteToast: () => void
}
