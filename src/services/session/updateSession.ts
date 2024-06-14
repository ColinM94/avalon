import { updateDocument } from "services";
import { useAppStore, useToastStore } from "stores";
import { GameSession } from "types";

export const updateSession = async (update: Partial<GameSession>) => {
  const { session } = useAppStore.getState();
  const { showToast } = useToastStore.getState();

  try {
    await updateDocument<GameSession>({
      id: session.id,
      collection: "sessions",
      data: update,
    });
  } catch (error) {
    showToast(String(error));
  }
};
