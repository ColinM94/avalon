import { Character } from "types/characters"

export interface Props {
  heading: string
  characters: Record<string, Character>
  maxActiveCharacters: number
  numActiveCharacters: number
  allegiance: "evil" | "good"
  updateCharacters: (update: Partial<Record<string, Character>>) => void
  className?: string
}
