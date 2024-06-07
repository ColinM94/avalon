export interface Character {
  id: string;
  allegiance: "good" | "evil";
  isActive: boolean;
  isOptional: boolean;
}

export type Characters = Record<string, Character>;
