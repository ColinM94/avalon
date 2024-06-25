import { User } from "types";

export type State = {
  user: User;
};

export type Actions = {
  updateAppStore: (update: Partial<State>) => void;
};
