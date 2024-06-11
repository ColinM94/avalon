export interface Character {
  id: string;
  allegiance: "good" | "evil";
  isActive: boolean;
  isOptional: boolean;
  description: string[];
  disabled: boolean;
}

export type Characters = Record<string, Character>;
