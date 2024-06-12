import { Toast } from "types";

export interface ToastState {
  toast: Toast | null;
  showToast: (text: string) => void;
  deleteToast: () => void;
}
