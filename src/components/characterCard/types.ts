import { Character } from "types";

export interface Props {
  character: Character;
  onClick?: (characterId: string) => void;
  orientation?: "portrait" | "landscape";
  showInfoButton?: boolean;
  alwaysActive?: boolean;
  showName?: boolean;
  showDescription?: boolean;
  className?: string;
}
