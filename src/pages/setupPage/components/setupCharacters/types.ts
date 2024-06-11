import { Character } from "types";

export interface Props {
  heading: string;
  characters: Record<string, Character>;
  maxActiveCharacters: number;
  numActiveCharacters: number;
  allegiance: "evil" | "good";
  updateCharacters: (update: Partial<Record<string, Character>>) => void;
  headingClassName?: string;
}
