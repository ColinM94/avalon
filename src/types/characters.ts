export interface Character {
  id: string;
  allegiance: "good" | "evil";
  isActive: boolean;
  isOptional: boolean;
  description: string[];
}

export type Characters = Record<string, Character>;
