import { Character } from "types/characters";
import { CharacterId } from "types/general";

export interface Props {
  character: Character;
  onClick?: (characterId: CharacterId) => void;
  orientation?: "portrait" | "landscape";
  showInfoButton?: boolean;
  alwaysActive?: boolean;
  disableAnimation?: boolean;
  showName?: boolean;
  showDescription?: boolean;
  revealed?: boolean;
  className?: string;
}
