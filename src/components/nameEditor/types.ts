import { GameSession, Player } from "types";

export interface Props {
  myPlayer: Player;
  session: GameSession;
  show: boolean;
  setShow: (show: boolean) => void;
}
