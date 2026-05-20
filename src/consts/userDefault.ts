import { User } from "types/user"
import { generateUniqueId } from "utils/generateUniqueId"

export const userDefault = (): User => {
  return {
    id: generateUniqueId(),
    name: "",
    sessionId: null,
    imageUrl: "",
  }
}
