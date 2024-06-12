import { SessionState } from "./types";
import { createZustandStore } from "../createZustandStore";
import { sessionDefault } from "consts";

export const useSessionStore = createZustandStore<SessionState>({
  name: "session",
  data: (set) => ({
    ...sessionDefault(),
    updateSessionStore: (update) => set({ ...update }),
  }),
  storageType: "localStorage",
});
