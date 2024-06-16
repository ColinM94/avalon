import { User } from "types";

export interface AppState {
  user: User;
  updateUser: (update: Partial<User>) => void;
}
