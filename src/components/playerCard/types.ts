import { Player } from "types";

export interface Props {
  player?: Player;
  onClick?: () => void;
  connected?: boolean;
  showName?: boolean;
  className?: string;
}
