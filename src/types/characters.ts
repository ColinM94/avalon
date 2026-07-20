import { CharacterId } from "./general";

export interface Character {
  id: CharacterId;
  allegiance: "good" | "evil";
  boosts: "good" | "evil";
  name: string;
  isActive: boolean;
  isOptional: boolean;
  description: string;
  howToPlay: string;
  disabled: boolean;
}

export type Characters = Record<string, Character>;
