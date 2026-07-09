import { CharacterId } from "types/general";

export interface Props {
  heading: string;
  characters: CharacterId[];
  maxActiveCharacters: number;
  numActiveCharacters: number;
  allegiance: "evil" | "good";
  setCharacters: React.Dispatch<React.SetStateAction<CharacterId[]>>;
  className?: string;
}
