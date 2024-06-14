import { User } from "types";
import { generateUniqueId } from "utils";

export const userDefault = (): User => {
  return {
    id: generateUniqueId(),
    name: "",
  };
};
