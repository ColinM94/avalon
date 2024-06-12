import { Character } from "types";

export interface Props {
  character: Character;
  onClick?: (characterId: string) => void;
  orientation?: "portrait" | "landscape";
  showInfoButton?: boolean;
  alwaysActive?: boolean;
  disableAnimation?: boolean;
  showName?: boolean;
  showDescription?: boolean;
  clickToReveal?: boolean;
  onReveal?: () => void;
  className?: string;
}
