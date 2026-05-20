import { Toast } from "types/toast"

export interface ToastState {
  toast: Toast | null
  showToast: (text: string, type?: Toast["type"]) => void
  deleteToast: () => void
}
