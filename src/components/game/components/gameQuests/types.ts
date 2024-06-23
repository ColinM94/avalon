import { GameState } from "types/game";

export interface Props {
  state: GameState;
  setIsReady: (isReady: boolean) => void;
}
