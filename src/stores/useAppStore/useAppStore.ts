import { userDefault } from "consts";

import { Actions, State } from "./types";
import { createZustandStore } from "../createZustandStore";

export const useAppStore = createZustandStore<State & Actions>({
  name: "app",
  data: (set) => ({
    user: userDefault(),
    updateAppStore: (update) => set({ ...update }),
  }),
  storageType: "localStorage",
  persistState: true,
});
