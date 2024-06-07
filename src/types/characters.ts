export interface Character {
  id: string;
  isActive: boolean;
  allegiance: "good" | "evil";
}

export type Characters = Record<string, Character>;
