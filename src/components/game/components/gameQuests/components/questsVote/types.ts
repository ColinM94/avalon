import { Quest } from "types";
import { GameState } from "types/game";

export interface Props {
  state: GameState;
  activeQuest: Quest;
  className?: string;
}
