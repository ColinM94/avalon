import { CharacterId } from "types/general";

export interface Props {
  characterId: CharacterId;
  selected: boolean;
  onSelect: (characterId: CharacterId) => void;
}
