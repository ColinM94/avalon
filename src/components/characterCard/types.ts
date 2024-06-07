import { Character } from "types";

export interface Props {
  character: Character;
  onClick: (characterId: string) => void;
  className?: string;
}
