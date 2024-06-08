import { Character } from "types";

export interface Props {
  character: Character;
  onClick: (characterId: string) => void;
  showInfoButton?: boolean;
  alwaysActive?: boolean;
  showName?: boolean;
  className?: string;
}
