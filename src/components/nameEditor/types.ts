import { GameSession, User } from "types";

export interface Props {
  user: User;
  userId: string;
  session: GameSession;
  show: boolean;
  setShow: (show: boolean) => void;
}
