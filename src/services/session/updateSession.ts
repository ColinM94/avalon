import { updateDocument } from "services";
import { useSessionStore, useToastStore } from "stores";
import { GameSession } from "types";

export const updateSession = async (
  update: Partial<GameSession>,
  sessionId?: string
) => {
  const { session } = useSessionStore.getState();
  const { showToast } = useToastStore.getState();

  const id = sessionId || session.id;

  if (!id) {
    throw "Unable to update session as no ID defined";
  }

  try {
    await updateDocument<GameSession>({
      id,
      collection: "sessions",
      data: update,
    });

    return true;
  } catch (error) {
    showToast(String(error));
  }
};
