import { updateDocument } from "services/firestore/updateDocument";
import { useAppStore } from "stores/useAppStore/useAppStore";
import { useSessionStore } from "stores/useSessionStore/useSessionStore";
import { GameSession } from "types/gameSession";

export const updateSession = async (update: Partial<GameSession>, idOverride?: string) => {
  const { sessionId } = useSessionStore.getState();
  const { showToast } = useAppStore.getState();

  const id = idOverride || sessionId;

  if (!id) {
    throw new Error("Unable to update session as no ID defined");
  }

  try {
    await updateDocument<GameSession>({
      id,
      collection: "sessions",
      data: update,
    });

    return true;
  } catch (error) {
    const err = error as Error;
    showToast(err.message, "error");
    return false;
  }
};
