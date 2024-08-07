import { Player } from "types";

export interface Props {
  player?: Player;
  width?: 1 | 2 | 3 | 4 | 5;
  onClick?: () => void;
  showLeaderIcon?: boolean;
  showIsReady?: boolean;
  connected?: boolean;
  showName?: boolean;
  className?: string;
}
